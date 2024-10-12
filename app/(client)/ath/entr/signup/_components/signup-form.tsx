"use client";
import { SignupSchema } from '@/app/schemas/validations';

import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/app/components/ui/inputs';
import { LoadingButton } from '@/app/components/ui/buttons';
import ErrorMessage from '@/app/components/ui/error-message';
import SuccessMessage from '@/app/components/ui/success-message';
const SignupForm = () => {
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {
        handleSubmit,
        formState: {
            errors
        },
        register
    } = useForm<FieldValues>({
        defaultValues: {
            username: '',
            password: '',
            email: ''
        }
    });
    const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues)=>{
        setIsLoading(true);
        const validatedData = SignupSchema.safeParse(data);
        if(!validatedData.success){
            setError("Invalid Fields");
        }
        try{
            const response = await fetch('/api/ath/entr/signup', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            if(!response.ok){
                setError(responseData.message || "Error while, creating account");
            }else{
                setSuccess(responseData.message);
            }
        }catch(error){
            setError("Client side error");
        }finally{
            setIsLoading(false);
        }
    }
  return (
    <div className='w-full md:w-1/4'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <h1 className='font-bold text-2xl'>Signup</h1>
            <div className='flex flex-col gap-2'>
                <Input disabled={isLoading} register={register} errors={errors} id="username" />
                <Input disabled={isLoading} register={register} errors={errors} id='email'/>
                <Input disabled={isLoading} register={register} errors={errors} id='password'/>
            </div>
            <ErrorMessage message={error}/>
            <SuccessMessage message={success}/>
            <LoadingButton disabled={isLoading} type='submit' texts={["signup", "signing up"]}/>
        </form>
    </div>
  )
}

export default SignupForm;
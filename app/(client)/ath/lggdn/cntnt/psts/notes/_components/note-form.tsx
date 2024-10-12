"use client";
import { Input, Textarea } from '@/app/components/ui/inputs';
import RichTextInput from '@/app/components/ui/richTextInput/rich-text-input';
import { JSONContent } from '@tiptap/react';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Button, LoadingButton } from '@/app/components/ui/buttons';
import { NoteSchema } from '@/app/schemas/validations';
import { create as createNote, update as updateNote } from '@/app/actions/notes';
import ErrorMessage from '@/app/components/ui/error-message';
import SuccessMessage from '@/app/components/ui/success-message';
import { read as readNote} from '@/app/actions/notes';
interface NoteFormProps {
  id: string;
}
const NoteForm: React.FC<NoteFormProps> = ({id}) => {
  const [formState, setFormState] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    watch, 
    setValue
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      content: null
    }
  });
  useEffect(()=>{
    if(id.length>3){
      setIsLoading(true);
      const init = async ()=>{
        try{
          const response: any = await readNote(id);
          if(response?.data){
            const {title, content, description} = response.data;
            setValue('title', title);
            setValue('content', content);
            setValue('description', description);
          }else{
            setFormState(10);
          }
        }catch(error){
          setFormState(10);
        }finally{
          setIsLoading(false);
        }
      }
      init();
    }
  }, []);
  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues)=>{
    setIsLoading(false);
    setError('');
    setSuccess('');
    const validatedData = NoteSchema.safeParse(data);
    if(!validatedData.success){
      setError('Invalid details');
    }
    try{
      data['content'] = JSON.parse(JSON.stringify(data['content']));
      if(id.length>3){
        // updation
        data['id'] = id;
        const response: any = await updateNote(data);
        if(response?.data){
          setSuccess(response.message);
        }else{
          setError(response.message || "Error occured on server side");
        }
      }else if(id==='nt'){
        // creation
        const response: any = await createNote(data);
        if(response?.data){
          setSuccess(response.message);
        }else{
          setError(response.message || "Error occured on server side");
        }
      }else{
        setFormState(10);
      }
    }catch(error){
      console.log(error);
      setError("Error occured on client side");
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <div className='w-screen h-screen px-8 py-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full flex h-full'>
        {
          formState===0 && (
            <div className='flex flex-col gap-4 w-full md:w-1/2'>
              <h1 className='text-2xl font-bold'>Configuration</h1>
              <div>
                <Input disabled={isLoading} id='title' errors={errors} register={register}/>
                <Textarea disabled={isLoading} id='description' errors={errors} register={register}/>
              </div>
              <ErrorMessage message={error}/>
              <SuccessMessage message={success}/>
              <Button type='button' disabled={isLoading} onClick={()=>setFormState(1)}>GoNext</Button>
            </div>
          )
        }{
          formState===1 && (
            <div className='w-full flex flex-col gap-4 h-full'>
              <h1 className='text-2xl font-bold'>Content</h1>
              <div className='h-full'>
                <RichTextInput disabled={isLoading} content={watch('content')} setContent={(content: JSONContent | null)=>setValue('content', content)}/>
              </div>
              <div className=''> 
                <ErrorMessage message={error}/>
                <SuccessMessage message={success}/>
              </div>
              <div className='flex gap-4 items-center'>
                <Button type="button" disabled={isLoading} onClick={()=>setFormState(0)}>GoPrev</Button>
                <LoadingButton fullWidth type='submit' disabled={isLoading} texts={["save", "saving"]}/>
              </div>
            </div>
          )
        }{
          formState===10 && (
            <div className='w-screen h-screen flex items-center justify-center'>
              <div>
                <h1 className='text-2xl font-bold text-primary'>Malware form, This page is not found</h1>
              </div>
            </div>
          )
        }
      </form>
    </div>
  )
}

export default NoteForm
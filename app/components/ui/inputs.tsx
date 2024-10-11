"use client";
import React from 'react'
import clsx from 'clsx';
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from 'react-hook-form';
interface InputProps {
    label?: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    disabled?: boolean;
}
export const Input:React.FC<InputProps> = ({label, id, type, required, register, errors, disabled}) => {
  return (
    <div>
        {label && <label className='block text-sm font-medium leading-6 text-gray-900
        ' htmlFor={id}>{label}</label>}
        <div className="mt-2">
            <input type={type} id={id} autoComplete={id} disabled={disabled} {...register(id, {required})} className={clsx("form-input block w-full rounded-md border-0 px-2 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-foreground bg-transparent placeholder:text-gray-400 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6", errors[id] && "focus:ring-rose-500", disabled && "opacity-50 cursor-default")} />
        </div>
    </div>
  )
}
interface TextareaProps {
  label?: string;
  id: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}
export const Textarea:React.FC<InputProps> = ({label, id, required, register, errors, disabled}) => {
return (
  <div>
      {label && <label className='block text-sm font-medium leading-6 text-gray-900
      ' htmlFor={id}>{label}</label>}
      <div className="mt-2">
          <textarea id={id} autoComplete={id} disabled={disabled} {...register(id, {required})} className={clsx("resize-none form-input block w-full rounded-md border-0 px-2 py-1.5 h-44 text-foreground shadow-sm ring-1 ring-inset ring-foreground bg-transparent placeholder:text-gray-400 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6", errors[id] && "focus:ring-rose-500", disabled && "opacity-50 cursor-default")}></textarea>
      </div>
  </div>
)
}
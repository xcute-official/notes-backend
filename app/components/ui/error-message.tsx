import React from 'react'
import { BsExclamationTriangle } from 'react-icons/bs';
interface ErrorMessageProps {
    message?: string;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => {
  return message ? (
    <div className='text-red-500 flex items-center gap-2 border-red-500 p-2 rounded-md w-full bg-red-300'>
        <span>{message}</span>
        <span><BsExclamationTriangle className='w-4 h-4'/></span>
    </div>
  ): null
}

export default ErrorMessage
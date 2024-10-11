import React from 'react'
import { BsDownload, BsExclamationTriangle } from 'react-icons/bs';
interface SuccessMessageProps {
    message?: string;
}
const SuccessMessage: React.FC<SuccessMessageProps> = ({message}) => {
  return message ? (
    <div className='text-green-500 flex items-center gap-2 border-green-500 p-2 rounded-md w-full bg-green-300'>
        <span>{message}</span>
        <span><BsDownload className='w-4 h-4'/></span>
    </div>
  ): null
}

export default SuccessMessage
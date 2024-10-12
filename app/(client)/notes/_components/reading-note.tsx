"use client";
import React, { useEffect, useState } from 'react';
import { JSONContent } from '@tiptap/react';
import { giveHTML } from '@/app/libs/helps';
interface ReadingNoteProps {
    content: JSONContent;
    title: string;
    description: string;
    updatedAt: string;
}
const ReadingNote: React.FC<ReadingNoteProps> = ({content, title, description, updatedAt}) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  useEffect(()=>{
    const init = async ()=>{
      let html = await giveHTML(content);
      setHtmlContent(html);
    }
    init();
  }, []);
  return (
    <div className='px-4 pt-8 md:px-8 flex flex-col gap-4'>
        <h1 className='text-5xl font-bold text-primary'>{title}</h1>
        <h2 className='text-xl font'>{description}</h2>
        <span className="text-xs">{updatedAt}</span>
        <div dangerouslySetInnerHTML={{__html: htmlContent}}>
          
        </div>
    </div>
  )
}

export default ReadingNote
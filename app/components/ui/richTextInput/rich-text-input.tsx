"use client";
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { EditorExtensions } from './Extensions';
import { BiBold, BiCode, BiHeading, BiLink, BiListUl, BiSave, BiUnderline } from 'react-icons/bi';
import { RiH1, RiH3, RiH5 } from 'react-icons/ri';
import { VscCode } from 'react-icons/vsc';
import ListItem from '@tiptap/extension-list-item';
import Underline from '@tiptap/extension-underline';

import { CiCircleCheck, CiSaveDown2 } from 'react-icons/ci';
interface RichTextInputProps {
    setContent: (content: JSONContent)=>void;
    disabled?: boolean;
    content: JSONContent | null;
}
const iconsizeclass = "w-4 h-4";
const RichTextInput: React.FC<RichTextInputProps> = ({setContent, disabled, content}) => {
    const [isSaving, setIsSaving] = useState(false);
    const editor = useEditor({
        extensions: EditorExtensions,
        onUpdate: ({editor})=>{
            setContent(editor.getJSON());
        },
        editorProps: {
            attributes: {
                class: 'outline-none text-sm h-full w-full border rounded-md p-2 overflow-scroll flex flex-col gap-2',
                spellcheck: "false",
            }
        },
        content,
        immediatelyRender: false,
        editable: !disabled
    })
  return (
    <div className='h-full flex flex-col'>
        <div className='shadow-sm p-2 rounded-md border flex justify-between'>
            <div className='flex gap-1 items-center'>
                <button
                    type="button"
                    onClick={()=>editor?.chain().focus().toggleHeading({level: 1}).run()}
                    disabled={
                        !editor?.can().chain().focus().toggleHeading({level: 1}).run()
                    }
                    className={clsx(editor?.isActive('heading', {level: 1})?'bg-primary text-white ':'', ' rounded-md p-1')}
                ><RiH1 className={clsx(iconsizeclass)}/></button>
                <button
                    type="button"
                    onClick={()=>editor?.chain().focus().toggleHeading({level: 3}).run()}
                    disabled={
                        !editor?.can().chain().focus().toggleHeading({level: 3}).run()
                    }
                    className={clsx(editor?.isActive('heading', {level: 3})?'bg-primary text-white ':'', ' rounded-md p-1')}
                ><RiH3 className={clsx(iconsizeclass)}/></button>
                <button
                    type="button"
                    onClick={()=>editor?.chain().focus().toggleHeading({level: 5}).run()}
                    disabled={
                        !editor?.can().chain().focus().toggleHeading({level: 5}).run()
                    }
                    className={clsx(editor?.isActive('heading', {level: 5})?'bg-primary text-white ':'', ' rounded-md p-1')}
                ><RiH5 className={clsx(iconsizeclass)}/></button>
                <button
                    type="button"
                    onClick={()=>editor?.chain().focus().toggleCode().run()}
                    disabled={
                        !editor?.can().chain().focus().toggleCode().run()
                    }
                    className={clsx(editor?.isActive('code')?'bg-primary text-white ':'', ' rounded-md p-1')}
                ><BiCode className={clsx(iconsizeclass)}/></button>
                <button
                    type="button"
                    onClick={()=>editor?.chain().focus().toggleCodeBlock().run()}
                    disabled={
                        !editor?.can().chain().focus().toggleCodeBlock().run()
                    }
                    className={clsx(editor?.isActive('codeBlock')?'bg-primary text-white ':'', ' rounded-md p-1')}
                ><VscCode className={clsx(iconsizeclass)}/></button>
                <button
                    type="button"
                    onClick={()=>editor?.chain().focus().toggleBold().run()}
                    disabled={
                        !editor?.can().chain().focus().toggleBold().run()
                    }
                    className={clsx(editor?.isActive('bold')?'bg-primary text-white ':'', ' rounded-md p-1')}
                ><BiBold className={clsx(iconsizeclass)}/></button>
                <button
                    type="button"
                    onClick={()=>editor?.chain().focus().toggleBulletList().run()}
                    disabled={
                        !editor?.can().chain().focus().toggleBulletList().run()
                    }
                    className={clsx(editor?.isActive('bulletList')?'bg-primary text-white ':'', ' rounded-md p-1')}
                ><BiListUl className={clsx(iconsizeclass)}/></button>
                <button
                    type="button"
                    onClick={()=>editor?.chain().focus().toggleUnderline().run()}
                    className={clsx(editor?.isActive('underline')?'bg-primary text-white ':'', ' rounded-md p-1')}
                ><BiUnderline className={clsx(iconsizeclass)}/></button>
            </div>
        </div>
        <div className='mt-2 h-full w-full flex flex-col'>
            <EditorContent editor={editor} className='flex-1'/>
        </div>
    </div>
  )
}



export default RichTextInput;
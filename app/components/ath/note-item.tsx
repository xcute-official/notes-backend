"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/buttons';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { LuDelete } from 'react-icons/lu';
import { FiDelete } from 'react-icons/fi';
import { deleteNote } from '@/app/actions/notes';
interface NoteItemProps {
    title: string;
    slug: string;
    updatedAt: string;
    index: number;
    id: string;
}
const NoteItem: React.FC<NoteItemProps> = ({title, slug, updatedAt, index, id}) => {
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const handleNoteDelete = async (identifier: string)=>{
        console.log("Deletion", identifier, id);
        try{
            const response: any = await deleteNote(identifier);
            console.log(`Response: `, response);
            if(response?.data && response?.status===200){
                // data deleted, update UI
                setIsDeleted(true);
            }else{
                // data deletion Error, udpate UI
                setIsDeleted(false);
            }
        }catch(error){
            console.log(error);
            // data deletion Error, update UI ["SERVER ERROR"]
        }
    }
  return !isDeleted ? (
    <li className='flex items-center gap-2 w-full px-4' >    
        <Link href={`/notes/${slug}`} className='w-full font-light'>
            <span>{title}</span>
        </Link>
        <div className='items-center flex gap-2'>
            <Link href={`/ath/lggdn/cntnt/psts/notes/${id}`} className=''>
                <span><BiEdit className='w-6 h-6'/></span>
            </Link>
            <span onClick={()=>handleNoteDelete(id)}><BiTrash className='w-6 h-6 cursor-pointer text-red-500'/></span>
        </div>
    </li>
  ):null
}

export default NoteItem;
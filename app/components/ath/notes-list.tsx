"use client";
import React from 'react'
import Link from 'next/link';
import NoteItem from './note-item';
import { update } from '@/app/actions/notes';
interface NotesListProps {
    notes: any[];
}

const NotesList: React.FC<NotesListProps> = ({notes}) => {
  return (
    <ul className='w-full flex flex-col gap-2'>
        {
            notes.map(({id, slug, title, updatedAt}: any, index: number)=>(
                <NoteItem id={id} slug={slug} title={title} updatedAt={updatedAt} index={index+1} key={index}/>
            ))
        }
    </ul>
  )
}

export default NotesList
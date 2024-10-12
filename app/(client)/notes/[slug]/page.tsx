
import prismadb from '@/app/libs/prismadb';
import React from 'react'
import ReadingNote from '../_components/reading-note';
import { readBySlug } from '@/app/actions/notes';

const page = async ({params}: any) => {
  const slug = params.slug;
  const note: any = (await readBySlug(slug))?.data;
  if(!note){
    return (
      <div>
        <h1>not found</h1>
      </div>
    )
  }
  console.log(note);
  return (
    <div>
      <ReadingNote title={note.title} description={note.description} content={note.content} updatedAt={note.updatedAt}/>
    </div>
  )
}

export default page
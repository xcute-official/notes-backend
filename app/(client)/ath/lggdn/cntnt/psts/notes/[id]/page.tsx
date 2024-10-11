import React from 'react'
import NoteForm from '../_components/note-form';

const page = async ({params}: any) => {
    const id = params.id;
  return (
    <div className=''>
      <NoteForm id={id}/>
    </div>
  )
}

export default page
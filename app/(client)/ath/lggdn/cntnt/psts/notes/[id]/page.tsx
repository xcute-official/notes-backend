import React from 'react'
import NoteForm from '../_components/note-form';
interface ParamsTyp {
  id: string;
}
const page = async ({params}: {params: ParamsTyp;}) => {
    const id = params.id;
  return (
    <div className=''>
      <NoteForm id={id}/>
    </div>
  )
}

export default page
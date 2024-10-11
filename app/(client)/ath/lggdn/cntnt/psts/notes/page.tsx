import { getAllNotes } from '@/app/actions/notes';
import React from 'react';
import SearchForm from './_components/search-form';
import Filters from './_components/filters';
import NoteItem from './_components/note-item';
import NotesList from './_components/notes-list';
interface Props {
  searchParams: {
    [key: string]: string | undefined
  }
}
const page = async ({searchParams}: Props) => {
  const notes: any[] | null = await getAllNotes();
  return (
    <div className='w-screen min-h-screen px-4 py-4'>
      <section className='w-full mx-auto md:w-1/2 flex flex-col gap-4'>
        <SearchForm />
        <Filters />
        <div className='w-full'>
          {
            notes?<NotesList notes={notes}/>:(
              <div>
                <h1>No data found</h1>
              </div>
            )
          }
        </div>
      </section>
    </div>
  )
}

export default page
import { getAllNotes } from '@/app/actions/notes';
import React from 'react';
import SearchForm from '@/app/components/ath/search-form';
import Filters from '@/app/components/ath/filters';
import NoteItem from '@/app/components/ath/note-item';
import NotesList from '@/app/components/ath/notes-list';
interface Props {
  searchParams: {
    [key: string]: string | undefined
  }
}
const page = async ({searchParams}: Props) => {
  const notes: any[] | null = await getAllNotes();
  return (
    <div className='w-screen min-h-screen px-4 py-4'>
      <section className='w-full mx-auto md:w-1/2 flex flex-col gap-8'>
        <div>
          <h1 className='text-center font-bold text-primary'>Explore my notes</h1>
        </div>
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
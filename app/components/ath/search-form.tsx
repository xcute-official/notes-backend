"use client";
import { formUrlQuery } from '@/app/libs/helps';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6';

const SearchForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [search, setSearch] = useState<string>('');
    useEffect(()=>{
        const delayDebounceFunction = setTimeout(()=>{
            let newUrl=''
            if(search){
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'query',
                    value: search
                })
            }else{
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['query']
                })
            }
            router.push(newUrl, {scroll: false});
        }, 300);
        return ()=>clearTimeout(delayDebounceFunction);
    }, [search]);
  return (
    <div className='flex items-center gap-2 border px-4 py-2 rounded-md'>
        <label htmlFor="search"><FaMagnifyingGlass className='w-4 h-4'/></label>
        <input type="text" placeholder='search here....' onChange={(e:any)=>setSearch(e.target.value)} id="search" className='outline-none bg-transparent text-foreground w-full text-sm p-2' />
    </div>
  )
}

export default SearchForm
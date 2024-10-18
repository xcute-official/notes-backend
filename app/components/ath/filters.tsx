"use client";
import { formUrlQuery } from '@/app/libs/helps';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
const filters = [
    'all',
    'frontends',
    'backends'
]
const Filters = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [filter, setFilter] = useState<string>('');
    const handleFilter = (fltr: string)=>{
        let newUrl = '';
        if(filter===fltr){
            setFilter('');
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ['category']
            });
        }else{
            setFilter(fltr);
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'category',
                value: fltr.toLowerCase()
            })
        }
        router.push(newUrl, {scroll: false});
    }
  return (
    <div>
        <ul className='flex items-center gap-4'>
            {
                filters.map((elem: string, index: number)=>(
                    <li onClick={()=>handleFilter(elem)} className={`${filter===elem?"bg-black text-white":"border"} rounded-md font-bold text-sm p-2 px-4 text-center text-primary`} key={index}>
                        <span>{elem}</span>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default Filters
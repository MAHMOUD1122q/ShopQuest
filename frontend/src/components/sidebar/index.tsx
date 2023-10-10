"use client"
import { adminLinks, userLinks } from '@/assets/data';
import { GlobalContext } from '@/context';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';


export default function Sidebar() {
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
  } = useContext(GlobalContext);

  const router = useRouter();

  return (
    <div className="w-[250px] h-full pt-12 left-0 pl-16 absolute">
      <div>
        <ul>
          {
            user?.role === "admin" ? adminLinks.map((t) => (
              <li key={t.id} onClick={()=>{router.push(t.path)}} className=' py-2 cursor-pointer'>{t.label}<span className='text-orange-700 capitalize ml-1'>({t.text})</span></li>
            )) : null
          }
        </ul>
        <div className=' w-[150px] h-[1px] bg-slate-200'></div>
        <ul>
          {
            isAuthUser ? userLinks.map((t)=> (
              <li key={t.id} onClick={()=>{router.push(t.path)}} className=' py-2 cursor-pointer'>{t.label}</li>
            )) : null
          }
        </ul>
      </div>
    </div>
  )
}

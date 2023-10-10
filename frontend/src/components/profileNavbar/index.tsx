'use client'

import { Menu, ShoppingCart } from 'lucide-react';
import { User } from 'lucide-react';
import { navAdmin, navOption } from "@/assets/data";
import Cookies from 'js-cookie';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from '@/context';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"



export default function ProfileNavbar() {
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
  } = useContext(GlobalContext);

  const pathName = usePathname()
  const router = useRouter();
  const [nav,setNav] = useState('h-[72px]')

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    router.push("/");
  }

  useEffect(() => {
    const shrinkHeader = () => {
        if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
            setNav('h-[60px] bg-black text-white')
        } else {
            setNav('h-[72px]')
        }
    }
    window.addEventListener('scroll', shrinkHeader);
    return () => {
        window.removeEventListener('scroll', shrinkHeader);
    };
}, []);

  return (
    
    <header className="bg-white fixed w-full z-20 top-0 left-0 border-gray-200">
      <div className={`flex justify-between items-center border-b-[1px] border-slate-200 ${nav} px-16  duration-300  max-md:px-0 `}>
        <div className="logo">
          <a href="/"><h2 className=" font-bold text-2xl">Shop<span className=" font-serif text-orange-700">Qhest</span></h2></a>
        </div>
        
        <ul className=" hidden md:flex">
          {
            user?.role === "admin" && isAuthUser?
              <div className='flex ml-20'>
                {
                  (
                    navAdmin.map(item => (
                      <a href={item.path} key={item.id} className=''><li className={` py-2 px-4 hover:bg-orange-700 hover:text-white duration-300 cursor-pointer `}>{item.label}</li></a>
                    ))
                  )
                }
              </div>
            :  
          <div className='flex ml-4'>
            {
              (
                navOption.map(item => (
                  <a href={item.path} key={item.id}><li  className="py-2 px-4 hover:bg-orange-700 hover:text-white duration-300 cursor-pointer">{item.label}</li></a>
                ))
              )
            }
          </div>
          }
        </ul>
        <div className="flex">
          <div className="flex p-2  hover:bg-orange-700 hover:!text-white duration-300 cursor-pointer" onClick={(item) => {
            isAuthUser?router.push('/cart'):router.push('/account/login')
          }}>
            <ShoppingCart />
            <p className=" ml-1">my Cart</p>
          </div>
          <Popover>
          <PopoverTrigger className=' hidden md:flex'>
            <div className="flex p-2 hover:bg-orange-700 hover:!text-white duration-300 cursor-pointer">
            <User />
            <p>My Account</p>
            </div>
          </PopoverTrigger>
          <PopoverContent className=" bg-black text-white w-60">
            {
              isAuthUser ? (
                <ul>
                  <li className='p-1 hover:px-2 hover:bg-orange-700 duration-300 cursor-pointer' onClick={handleLogout}>Logout</li>
                </ul>
              ):   
              (<ul>
              <li className='p-1 hover:px-2 hover:bg-orange-700 duration-300 cursor-pointer' onClick={()=>router.push('/account/login')}>Login</li>
              <li className='p-1 hover:px-2 hover:bg-orange-700 duration-300 cursor-pointer' onClick={()=>router.push('/account/register')}>Register</li>
            </ul>)
            }
          </PopoverContent>
        </Popover>
          <Sheet>
            <SheetTrigger><Menu className="md:hidden mx-1" /></SheetTrigger>
            <SheetContent className="bg-black text-white">
              <SheetHeader>
                <SheetTitle> 
                    <div className="flex items-center cursor-pointer" onClick={()=> router.push('/')}>
                      <h2 className=" font-bold text-2xl text-white">Shop<span className=" font-serif text-orange-700">Qhest</span></h2>
                    </div>
                </SheetTitle>
                <SheetDescription>
                  <ul className="flex">
                    {
                      user?.role === "admin" && isAuthUser?
                        <div className=' mx-auto'>
                          {
                            (
                              navAdmin.map(item => (
                                <a href={item.path} key={item.id} className=''><li className={` py-2 px-4 hover:bg-orange-700 duration-300 cursor-pointer text-white `}>{item.label}</li></a>
                              ))
                            )
                          }
                        </div>
                      :  
                    <div className='mx-auto'>
                      {
                        (
                          navOption.map(item => (
                            <a href={item.path} key={item.id}><li  className="py-2 px-4 hover:bg-orange-700  duration-300 cursor-pointer text-white ">{item.label}</li></a>
                          ))
                        )
                      }
                    </div>
                    }
                  </ul>
                  <div className='w-[70%] text-center bg-orange-700 h-[2px] my-2 mx-auto'></div>
                  {
                    isAuthUser ? (
                      <ul className='text-white'>
                        <li className='p-1 hover:px-2 hover:bg-orange-700 duration-300 cursor-pointer' onClick={handleLogout}>Logout</li>
                      </ul>
                    ):   
                    (<ul>
                    <li className='p-1 hover:px-2 hover:bg-orange-700 duration-300 cursor-pointer' onClick={()=>router.push('/account/login')}>Login</li>
                    <li className='p-1 hover:px-2 hover:bg-orange-700 duration-300 cursor-pointer' onClick={()=>router.push('/account/register')}>Register</li>
                  </ul>)
                  }
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

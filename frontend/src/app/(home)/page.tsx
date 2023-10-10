'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function Home() {
  return (
    <div className=' w-full h-[72vh]'>
    <Swiper
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper w-full h-full"
      >
        <SwiperSlide className=' text-center text-lg bg-white flex justify-center items-center'>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
      </Swiper>
    </div>
  )
}

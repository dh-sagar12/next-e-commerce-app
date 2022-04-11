/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const HomeSlider = () => {

    let slides = [
    ]

    for (let i = 0; i < 5; i++) {
        slides.push(
            <SwiperSlide key={`slide-${i}`} tag='li' >
                <img src={`https://picsum.photos/id/${i}/1000/500`} className='w-screen h-fit' alt={`slideImage-${i}`} />
            </SwiperSlide>
        )

    }
    SwiperCore.use([Navigation, Pagination, Autoplay])

    return (
        <>
            <Swiper
                wrapperTag='ul'
                loop
                pagination={{
                    clickable: true

                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                spaceBetween={10}
            >
                {slides}
            </Swiper>

        </>
    )
}

export default HomeSlider
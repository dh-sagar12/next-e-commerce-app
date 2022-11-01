/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import Banner from '../pages/admin/banner';
import Link from 'next/link';

const HomeSlider = () => {
    const [BannerImageState, setBannerImageState] = useState([])
    const base_url = process.env.baseURL

    useEffect(() => {
        fetchbannerImageData()
    }, [])


    const fetchbannerImageData = async () => {
        await axios.get(`${base_url}/api/get-banner-image/?active_only=true`).then(res => {
            let result = res.data
            setBannerImageState(result)


        }).catch(err => {
            if (err.message) {
                message.error(message)
            }
        })
    }

    let slides = [
    ]

    

    slides = BannerImageState.map((item) => {
        return <SwiperSlide key={item.id} tag='li'  >
            <Link href={item.redirect_url}><img src={`${base_url}${item.file_name}`} className='w-screen h-fit cursor-pointer' alt={item.alt_text} /></Link>
        </SwiperSlide>
    })

  
    SwiperCore.use([Navigation, Pagination, Autoplay])

    return (

        BannerImageState.lenght < 1 ? <></>
            :
            <>
                <div >
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
                </div>
            </>

    )
}

export default HomeSlider
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { message } from 'antd'

const DisplayMobileCategory = () => {
    const base_url  =  process.env.baseURL
    const [CategoryData, setCategoryData] = useState([])

    useEffect(() => {
        axios.get(`${base_url}/api/get-category/`).then(res=>{
            let result  =  res.data
            console.log(result);
            setCategoryData(result)
        }).catch(err=>{
            message.error('SOMETHING WENT WRONG WHILE FETCHING DATA FROM SERVER')
        })
    }, [])
    
    
    return (
        <>
            <div className="grid grid-cols-1 gap-x-2 gap-y-3 md:gap-3 m-4  md:grid-cols-4 md:px-4 md:py-5">
                {
                    CategoryData.map((category) => {
                        return (
                            <Link key={category.id} href={category.slug} passHref>
                                <a>
                                    <div className=" bg-zinc-50 border border-purple-100 shadow-md cursor-pointer " >
                                        <div className="rounded-md  break-inside-avoid-column flex items-center justify-between px-2 sm:px-8 md:px-0 md:p-2">
                                            <div className=' justify-center w-1/4 h-24 sm:w-1/6 p-2 flex items-center sm:h-32 md:justify-start md:w-2/4 md:h-16 md:m-auto lg:pl-4 '>
                                                <img src={`${base_url}${category.thumbnail_img}`} alt="alt" className='bg-transparent  hover:scale-105 aspect-auto  duration-500 max-w-full max-h-full ' />
                                            </div>
                                            <div className='md:pr-8 lg:pr-6 w-2/3'>
                                                <h4 className="font-extrabold text-md sm:text-xl md:text-sm lg:text-xl md:hover:text-purple-500">{category.category_name}</h4>
                                                <p className='text-gray-500 text-sm md:hidden'>{category.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        )
                    })
                }

            </div>
        </>
    )
}

export default DisplayMobileCategory;
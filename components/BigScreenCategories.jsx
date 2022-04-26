/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/dist/client/link'
import { BsCartPlus } from 'react-icons/bs';
import DisplayMobileCategory from './DisplayMobileCategory';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
const BigScreenCategories = () => {
    const cateProd = [
        {
            cid: 1,
            title: 'Popular on T-shirts',
            link: '/categories/tshirts',
            product: [
                {
                    id: 1,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 2,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 3,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 4,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 5,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 6,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 7,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 8,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 9,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 10,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                }
            ]
        },
        {
            cid: 2,
            title: 'Popular on Footwears',
            link: '/categories/footwears',
            product: [
                {
                    id: 1,
                    name: 'Nike show',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 2,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 3,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 4,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 5,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 6,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 7,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 8,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 9,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                },
                {
                    id: 10,
                    name: 'Basic Tee',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
                    imageAlt: "Front of men's Basic Tee in black.",
                    price: '$35',
                    color: 'Black',
                }
            ]
        },

    ]


    SwiperCore.use([Navigation, Pagination, Autoplay])

    return (
        <>
            <div>
                <h1 className='text-center pt-5 text-2xl font-semibold'>Popular Categories</h1>
            </div>
            <DisplayMobileCategory />

            {
                cateProd.map((cp) => {
                    return (
                        <>
                            <div className="title flex justify-between items-center py-5 px-3 md:px-10 " key={cp.cid}>
                                <h2 className='text-2xl font-bold'> {cp.title}</h2>
                                <ul className="see-more list-none">
                                    <Link href={cp.link}><a className='text-purple-500 font-semibold underline'>See More</a></Link>
                                </ul>
                            </div>

                            <Swiper className='mt-6 grid grid-cols-2 gap-y-8 gap-x-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-x-8'
                                slidesPerView={6}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                }}>
                                {cp.product.map((prod) => {
                                    return (
                                        <>
                                            <SwiperSlide key={prod.id} tag='li' >
                                                <div className="group relative p-1 border border-purple-200  rounded-md transition duration-500 hover:scale-105 hover:shadow-md cursor-pointer " >
                                                    <div className="w-full min-h-80  rounded overflow-hidden  aspect-auto">
                                                        <img
                                                            src={prod.imageSrc}
                                                            alt={prod.name}
                                                            className="w-full h-full object-center object-cover lg:h-3/4  lg:w-auto md:hover:scale-110 duration-100"
                                                        />
                                                    </div>
                                                    <div className="mt-4 flex justify-between pb-2 px-2 items-center">
                                                        <div>
                                                            <h3 className="text-sm text-gray-900 font-semibold">
                                                                <a href={prod.href}>
                                                                    {prod.name}
                                                                </a>
                                                            </h3>
                                                            <p className="text-sm font-medium text-gray-400">{prod.price}</p>
                                                        </div>
                                                        <div>
                                                            <BsCartPlus className='text-xl self-center cursor-pointer hover:text-purple-500' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        </>
                                    )
                                })}
                            </Swiper>

                        </>
                    )
                })

            }

        </>
    )
}

export default BigScreenCategories;
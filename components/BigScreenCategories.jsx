/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/dist/client/link'
import AddToCartBtn from './AddToCartBtn';
import DisplayMobileCategory from './DisplayMobileCategory';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import ProductCard from './ProductCard';
import ProductItemCard from './ProductItemCard';



const BigScreenCategories = ({PopularCategory}) => {
    console.log(PopularCategory);
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
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 35],
                    color: 'Black',
                },
                {
                    id: 2,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 3,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 4,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 5,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 6,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 7,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 8,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 9,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 10,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
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
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 2,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 3,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 4,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 5,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 6,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 7,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 8,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 9,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
                    color: 'Black',
                },
                {
                    id: 10,
                    name: 'Basic Tee',
                    href: '#',
                    images:[{ file_name: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'}],
                    imageAlt: "Front of men's Basic Tee in black.",
                    price_option:[ 32],
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
                PopularCategory.map((cp) => {
                    return (
                        <>
                            <div className="title flex justify-between items-center py-5 px-3 md:px-10 " key={cp.category_id}>
                                <h2 className='text-2xl font-bold'> {cp.category_title}</h2>
                                <ul className="see-more list-none">
                                    <Link href={cp.category_url}><a className='text-purple-500 font-semibold underline'>See More</a></Link>
                                </ul>
                            </div>

                            <Swiper className='mt-6 grid grid-cols-2 gap-y-8 gap-x-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-x-8'
                                slidesPerView={6}
                                spaceBetween={30}
                                pagination={{
                                    clickable: true,
                                }}>
                                {cp.products.map((prod) => {
                                    return (
                                        <>
                                            <SwiperSlide key={prod.product_id} tag='li' >
                                                <ProductItemCard product={prod} />
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


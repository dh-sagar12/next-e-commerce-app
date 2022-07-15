/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import AddToCartBtn from './AddToCartBtn'
import ProductCard from './ProductCard'



const products = [
  {
    id: 1,
    name: 'Basic Tee 1',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl',
    slug: 'basic-tea-1'
  },
  {
    id: 2,
    name: 'Basic Tee 2',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl',
    slug: 'basic-tea-1'
  },
  {
    id: 3,
    name: 'Basic Tee 3',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl',
    slug: 'basic-tea-1'
  },
  {
    id: 4,
    name: 'Basic Tee 4',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl',
    slug: 'basic-tea-1'
  },
  {
    id: 5,
    name: 'Basic Tee 5',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl',
    slug: 'basic-tea-1'
  },
  {
    id: 6,
    name: 'Basic Tee 6',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl',
    slug: 'basic-tea-1'
  },
  {
    id: 7,
    name: 'Basic Tee 7',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl',
    slug: 'basic-tea-1'
  },
  {
    id: 8,
    name: 'Basic Tee 8',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl',
    slug: 'basic-tea-1'
  },
  {
    id: 9,
    name: 'Basic Tee 9',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl',
    slug: 'basic-tea-1'
  },
  {
    id: 10,
    name: 'Basic Tee 10',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl',
    slug: 'basic-tea-1'
  }
  // More products...
]

const DisplayItems = () => {




  return (
    <>

      <div className="bg-slate-50 md:py-6">
        <div className="max-w-2xl mx-auto pt-16 pb-0 px-4 sm:pt-10 md:mx-16 sm:mx-auto  lg:max-w-7xl ">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Item For You</h2>

          <div className="mt-6  grid grid-cols-2 gap-y-8 gap-x-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-x-8">
            {
              products.map((product) => {
                return (
                  <>
                    <ProductCard product={product} />
                  </>

                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default DisplayItems
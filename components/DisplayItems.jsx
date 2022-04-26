/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { BsCartPlus } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/cart/cartSlice'



const products = [
  {
    id: 1,
    name: 'Basic Tee 1',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl'
  },
  {
    id: 2,
    name: 'Basic Tee 2' ,
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl'
  },
  {
    id: 3,
    name: 'Basic Tee 3',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl'
  },
  {
    id: 4,
    name: 'Basic Tee 4',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl'
  },
  {
    id: 5,
    name: 'Basic Tee 5',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl'
  },
  {
    id: 6,
    name: 'Basic Tee 6',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl'
  },
  {
    id: 7,
    name: 'Basic Tee 7',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl'
  },
  {
    id: 8,
    name: 'Basic Tee 8',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl'
  },
  {
    id: 9,
    name: 'Basic Tee 9',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl'
  },
  {
    id: 10,
    name: 'Basic Tee 10',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: 12,
    color: 'bg-[#ff0000]',
    size: 'xl'
  }
  // More products...
]

const DisplayItems = () => {
  const dispatch = useDispatch();



  const handleAddItem = (product) => {
    console.log(product);
    dispatch(addItem(product))
  }

  


  return (
    <>
      <div className="bg-slate-50 md:py-6">
        <div className="max-w-2xl mx-auto pt-16 pb-0 px-4 sm:pt-10 md:mx-16 sm:mx-auto  lg:max-w-7xl ">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Item For You</h2>

          <div className="mt-6  grid grid-cols-2 gap-y-8 gap-x-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-x-8">
            {
              products.map((product) => {
                return (
                  <div className="group relative p-1 border border-purple-200  rounded-md transition duration-500 hover:scale-105 hover:shadow-md cursor-pointer " key={product.id}>
                    <div className="w-full min-h-80  rounded overflow-hidden  aspect-auto">
                      <img
                        src={product.imageSrc}
                        alt={product.name}
                        className="w-full h-full object-center object-cover lg:h-3/4  lg:w-auto md:hover:scale-110 duration-100"
                      />
                    </div>
                    <div className="mt-4 flex justify-between pb-2 px-2 items-center">
                      <div>
                        <h3 className="text-sm text-gray-900 font-semibold">
                          <a href={product.href}>
                            {product.name}
                          </a>
                        </h3>
                        <p className="text-sm font-medium text-gray-400">${product.price}</p>
                      </div>
                      <div>
                        <button onClick={() => handleAddItem({ ...product, cartvalue: 1 })}>
                          <BsCartPlus className='text-xl self-center cursor-pointer hover:text-purple-500' />
                        </button>
                      </div>
                    </div>
                  </div>
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
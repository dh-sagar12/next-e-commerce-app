import React from 'react'
import MobileFilterNav from '../../components/MobileFilterNav';
import { BsCartPlus } from 'react-icons/bs'



const Tshirts = () => {

  const products = [
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
    // More products...
  ]



  return (
    <>
      <h1 className='text-4xl text-center '>T-shirts</h1>
      <MobileFilterNav />
      <hr className='my-3 bg-purple-500' />
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
                    <p className="text-sm font-medium text-gray-400">{product.price}</p>
                  </div>
                  <div>
                    <BsCartPlus className='text-xl self-center cursor-pointer hover:text-purple-500' />
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>

    </>
  )
}

export default Tshirts;
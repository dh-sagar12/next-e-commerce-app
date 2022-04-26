/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useState } from 'react'
import CartPage from '../components/CartPage'


const Cart = () => {
  let cart = [
    {
      id: 1,
      title: "T-Shirts",
      img: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      desc: 'Formal  & Unformal Both of All sizes',
      cartvalue: 1,
      color: 'bg-[#50d71e]',
      size: 'xl'
    },
    {
      id: 2,
      title: "Hoodies",
      img: 'https://static-01.daraz.com.np/p/aa1cb3b65d946f981825db7f36fbcebb.jpg',
      desc: 'Formal  & Unformal Both of All sizes',
      cartvalue: 1,
      color: 'bg-[#ea08ff]',
      size: 'md'
    },
    {
      id: 3,
      title: "Trousers and Pants",
      img: 'https://static-01.daraz.com.np/p/0db552a77c12de3ecd34ee5978a31b07.jpg',
      desc: 'Formal  & Unformal Both of All sizes',
      cartvalue: 1,
      color: 'bg-[#dae016]',
      size: 'sm'




    },
    {
      id: 4,
      title: "Footwears",
      img: 'https://m.media-amazon.com/images/I/71sSvtnSBwL._AC_UX500_.jpg',
      desc: 'Formal  & Unformal Both of All sizes',
      cartvalue: 1,
      color: 'bg-[#fcf112]',
      size: '2xl'




    },
    {
      id: 5,
      title: "Shirts",
      img: 'https://m.media-amazon.com/images/I/816fhPoCRyS._AC_UY500_.jpg',
      desc: 'Formal  & Unformal Both of All sizes',
      cartvalue: 1,
      color: 'bg-[#ff0000]',
      size: 'xl'




    },
    {
      id: 6,
      title: "Eyewears",
      img: 'https://m.media-amazon.com/images/I/51e+5-rJlOL._AC_UX679_.jpg',
      desc: 'Formal  & Unformal Both of All sizes',
      cartvalue: 1,
      color: 'bg-[#dae016]',
      size: 'xl'




    },
    {
      id: 7,
      title: "Sports Collections",
      img: 'https://m.media-amazon.com/images/I/711J2M6vm8L._AC_UY500_.jpg',
      desc: 'Formal  & Unformal Both of All sizes',
      cartvalue: 120,
      color: 'bg-[#000000]',
      size: 'xl'
    },

  ]

  const [Cart, setCart] = useState(cart)

  let newCart = []
  let decreaseCartValue = (id) => {

    Cart.forEach((item) => {
      if (item.id == id) {
        item.cartvalue = item.cartvalue - 1
        newCart = [...Cart]
        setCart(newCart)
      }
    })

  }

  let increaseCartValue = (id) => {

    Cart.forEach((item) => {
      if (item.id == id) {
        item.cartvalue = item.cartvalue + 1
        newCart = [...Cart]
        setCart(newCart)
      }
    })
  }


  let removecartItems = (id) => {
    newCart = Cart.filter((keys) => {
      return (
        keys.id !== id
      )
    })
    setCart(newCart)
  }


  let handleOnchangeCartValue = (event) => {
    let { value } = event.target
    console.log(event);


    // Cart.forEach((item)=>{
    //   if (item.id == id){
    //     item.cartvalue = value
    //     newCart = [...Cart]
    //     setCart(newCart)
    //   }
    // })
  }

  return (
    <>
      <CartPage />
    </>
  )
}

export default Cart;
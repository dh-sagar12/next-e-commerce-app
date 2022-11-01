import React from 'react'
import Image from 'next/dist/client/image'
import Link from 'next/dist/client/link'
import { BsSearch, BsCartPlus } from 'react-icons/bs'
import { useSelector } from 'react-redux'



const MobileUpNav = () => {
    let cartitem = useSelector(state =>state.cartSlice.cart)
    
    
    return (
        <>
            <header className=" w-full sticky top-0 z-20 text-white" >
                <nav className="flex justify-between flex-col w-full bg-slate-900 text-white py-2 ">
                    <div className='flex justify-between px-2 items-center md:pb-3'>
                        <Link href={'/'} className=''>
                            <a className='flex justify-center item-center justify-self-end'>
                                <Image src={'/gustylogo.png'} alt={'logo'} width={40} height={40} />
                                <span className='self-center font-extrabold font-[Bunge] sm:text-xl text-white'>GUSTY</span>
                            </a>
                        </Link>
                        <div className="navItems hidden md:flex">
                            <ul className='hidden md:flex space-x-5 text-white'>
                                <li>
                                    <Link href={'/'}><a className=' text-white hover:text-purple-500 text-md font-semibold'>Home </a></Link>
                                </li>
                                <li>
                                    <Link href={'/categories'}><a className='text-white hover:text-purple-500 text-md font-semibold'>Categories </a></Link>
                                </li>
                                <li>
                                    <Link href={'/popular'}><a className='text-white hover:text-purple-500 text-md font-semibold'>Track My Orders </a></Link>
                                </li>
                                <li>
                                    <Link href={'/contact'}><a className='text-white hover:text-purple-500 text-md font-semibold'>Contact </a></Link>
                                </li>
                                <li>
                                    <Link href={'/about'}><a className='text-white hover:text-purple-500 text-md font-semibold'>Customer Care </a></Link>
                                </li>
                            </ul>
                        </div>
                        <div className="icons ">
                            <Link href={'/login'}><a className=' text-white cursor-pointer bg-purple-500 text-sm hover:bg-purple-400 font-[inherit] rounded-sm p-1 mx-1 sm:text-md'>Login</a></Link>
                            <Link href={'/signup'}><a className=' text-white cursor-pointer bg-purple-500 text-sm hover:bg-purple-400 font-[inherit] rounded-sm p-1 mx-1 sm:text-md'>Signup</a></Link>


                        </div>
                    </div>
                    <div className="md:items-center md:w-auto flex md:justify-between ">
                        <div className="flex text-sm ">
                            <div className=' w-screen flex px-2 md:px-44 '>
                                <input type="text" className='focus:outline-none text-black w-full rounded-sm px-1 text-lg md:px-3 md:py-2' placeholder='Search Items' />
                                <button type="submit" className='bg-purple-500 px-1 mx-1 rounded-sm py-1 sm:px-3'><BsSearch /></button>
                                <Link href={'/cart'} >
                                    <a className='text-3xl mx-3 pt-1 hidden md:block relative text-white'>
                                        <BsCartPlus />
                                        <span className=" p-[3px] leading-none opacity-95  border-white item-number absolute top-0 -right-2 text-[13px] bg-red-700 rounded-full">
                                            <span className='m-1'>{cartitem.length}</span>
                                        </span>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default MobileUpNav;
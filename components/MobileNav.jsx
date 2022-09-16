import React from 'react'
import Link from 'next/dist/client/link'
import { AiOutlineHome } from 'react-icons/ai'
import { BiCategory } from 'react-icons/bi'
import { BsCartPlus } from 'react-icons/bs'
import { VscAccount } from 'react-icons/vsc'
import { useState } from 'react'
import { useSelector } from 'react-redux';

    const MobileNav = () => {
        const [Active, setActive] = useState(true)
        let cartitem = useSelector(state =>state.cartSlice.cart)
        return (
            <>
                <div className="w-full text-white">
                    <div className="bottomNav fixed bottom-0 w-full shadow-md">
                        <nav className="md:hidden bottom-0 w-full bg-gray-700 text-xs">
                            <ul className="flex justify-around items-center text-white text-center opacity-75 text-lg font-bold m-0">
                                <li className={`p-3 hover:text-purple-500 active text-white`}>
                                    <Link href={"/"}>
                                        <a className='flex flex-col justify-center items-center text-white'>
                                            <AiOutlineHome className='text-2xl self-center' />
                                            <span className='text-sm'>Home</span>
                                        </a>
                                    </Link>
                                </li>
                                <li className="p-3 hover:text-purple-500">
                                    <Link href={"/categories"}>
                                        <a className='flex flex-col justify-center items-center text-white'>
                                            <BiCategory className='text-2xl self-center' />
                                            <span className='text-sm text-white'>Category</span>
                                        </a>
                                    </Link>
                                </li>
                                <li className="p-3 hover:text-purple-500">
                                    <Link href={"/cart"}>
                                        <a className='flex flex-col justify-center items-center text-white'>
                                            <div className='relative '>
                                                <BsCartPlus className='text-2xl self-center text-white' />
                                                <span className=" p-[2.5px] leading-none opacity-95  absolute -top-2 border-[1px] border-white -right-5 text-[13px] bg-red-700 rounded-full">
                                                    <span className='m-1'>{cartitem.length}</span>
                                                </span>
                                            </div>
                                            <span className='text-sm text-white'>Cart</span>
                                        </a>
                                    </Link>
                                </li>
                                <li className="p-3 hover:text-purple-500">
                                    <Link href={"/account"}>
                                        <a className='flex flex-col justify-center items-center text-white'>
                                            <VscAccount className='text-2xl text-white self-center' />
                                            <span className='text-sm text-white'>Account</span>
                                        </a>
                                    </Link>
                                </li>

                            </ul>
                        </nav>
                    </div>
                </div>
            </>
        )
    }

export default MobileNav
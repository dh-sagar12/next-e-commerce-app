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
                <div className="w-full">
                    <div className="bottomNav fixed bottom-0 w-full shadow-md">
                        <nav className="md:hidden bottom-0 w-full bg-gray-700 text-xs">
                            <ul className="flex justify-around items-center text-white text-center opacity-75 text-lg font-bold">
                                <li className={`p-3 hover:text-purple-500 active`}>
                                    <Link href={"/"}>
                                        <a className='flex flex-col justify-center items-center '>
                                            <AiOutlineHome className='text-2xl self-center' />
                                            <span className='text-sm'>Home</span>
                                        </a>
                                    </Link>
                                </li>
                                <li className="p-3 hover:text-purple-500">
                                    <Link href={"/categories"}>
                                        <a className='flex flex-col justify-center items-center'>
                                            <BiCategory className='text-2xl self-center' />
                                            <span className='text-sm'>Category</span>
                                        </a>
                                    </Link>
                                </li>
                                <li className="p-3 hover:text-purple-500">
                                    <Link href={"/cart"}>
                                        <a className='flex flex-col justify-center items-center'>
                                            <div className='relative'>
                                                <BsCartPlus className='text-2xl self-center' />
                                                <span className=" p-[2.5px] leading-none opacity-95  absolute -top-2 border-[1px] border-white -right-5 text-[13px] bg-red-700 rounded-full">
                                                    <span className='m-1'>{cartitem.length}</span>
                                                </span>
                                            </div>
                                            <span className='text-sm'>Cart</span>
                                        </a>
                                    </Link>
                                </li>
                                <li className="p-3 hover:text-purple-500">
                                    <Link href={"/account"}>
                                        <a className='flex flex-col justify-center items-center'>
                                            <VscAccount className='text-2xl self-center' />
                                            <span className='text-sm'>Account</span>
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
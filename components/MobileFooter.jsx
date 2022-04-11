import React from 'react'
import {BsInstagram, BsFacebook, BsTwitter} from 'react-icons/bs'

const MobileFooter = () => {
  return (
    <>
        <div className='w-full  flex flex-col  items-center bg-slate-100 py-10 mb-12 md:mb-0'>
            <p className='font-normal text-xl text-purple-600 '>Copyright &copy; Gusty Inc.	</p>
            <ul className='flex space-x-3 py-2 text-purple-500'>
                <li><BsFacebook/></li>
                <li><BsInstagram/></li>
                <li><BsTwitter/></li>
            </ul>
        </div>
    </>
  )
}

export default MobileFooter
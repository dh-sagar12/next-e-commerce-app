import { Button } from 'antd'
import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import Link from 'next/link'

const AddProduct = () => {
  return (
    <div className="h-screen">
      <div className='px-10 py-7'>
        <h2 className='font-extrabold text-lg text-purple-600'>Add Product</h2>
        <Link href={'/admin/product/add'}>
          <Button icon={<PlusOutlined />} className='flex items-center text-sm bg-gray-700 text-white hover:bg-purple-500 border-0 '>
            Add Product
          </Button>
        </Link>
        <hr className='my-3' />
      </div>
    </div>
  )
}

export default AddProduct
import { Button, Row,Col } from 'antd'
import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import Link from 'next/link'
import ViewAddedProduct from '../../components/admin/ViewAddedProduct'
import Search from 'antd/lib/input/Search'
import { useState } from 'react'

// import Search from 'antd/lib/transfer/search'



const AddProduct = () => {
  const [SearchLoading, setSearchLoading] = useState(false)

  const handleOnChangeSearch = ()=> {
    setSearchLoading(true)
  }

  return (
    <div className="h-screen">
      <div className='px-10 py-7'>
        <h2 className='font-extrabold text-lg text-purple-600'>Add Product</h2>
        <Row className='flex justify-between'>
          <Col>
            <Link href={'/admin/product/add'}>
              <Button icon={<PlusOutlined />} className='flex items-center text-sm bg-gray-700 text-white hover:bg-purple-500 border-0 '>
                Add Product
              </Button>
            </Link>
          </Col>
          <Col span={10}>
            <Search placeholder='Filter Product' onChange={handleOnChangeSearch} loading={SearchLoading} >

            </Search>
          </Col>
        </Row>
        <hr className='my-3' />
        <div>
          <ViewAddedProduct />
        </div>
      </div>
    </div>
  )
}

export default AddProduct
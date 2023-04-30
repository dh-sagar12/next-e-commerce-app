import { Button, Row, Col } from 'antd'
import React from 'react'
import Search from 'antd/lib/input/Search'
import { useState } from 'react'
import OrderViewTable from '../../components/admin/OrderViewTable'


const Orders = () => {
  return (
    <div className="h-screen">
      <div className='px-10 py-7'>
        <h2 className='font-extrabold text-2xl text-purple-600'>Orders</h2>
        <Row className='flex justify-between'>
          <Col>

          </Col>
          <Col span={10}>
            <Search placeholder='Filter Product'  >

            </Search>
          </Col>
        </Row>
        <hr className='my-3' />
        <div>
            <OrderViewTable/>
        </div>
      </div>
    </div>
  )
}

export default Orders
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import AddToCartBtn from './AddToCartBtn'
import ProductCard from './ProductCard'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';
import { message, Spin } from 'antd';
import axios from 'axios';
import {WarningTwoTone} from '@ant-design/icons'




const DisplayItems = (props) => {
  const base_url = process.env.baseURL

  const { ProductItems } = props
  const [FetchedProductState, setFetchedProductState] = useState(ProductItems.results)
  const [DataStatus, setDataStatus] = useState({
    count: ProductItems.count,
    next: ProductItems.next,
    previous: ProductItems.previous

  })

  const fetchMoreData = () => {
    axios.get(DataStatus.next).then(res => {
      let result = res.data
      setFetchedProductState((preval) => {
        return preval.concat(result.results)
      })
      setDataStatus((preval) => {
        return { ...preval, next: result.next, previous: result.previous }

      })


    }).catch(err => {
      message.error('ERROR ON FETCHING DATA FROM SERVER')
    })
  }





  return (
    <>

      <div className="bg-slate-50 md:py-6">
        <div className="max-w-2xl mx-auto pt-16 pb-0 px-4 sm:pt-10 md:mx-16 sm:mx-auto  lg:max-w-7xl ">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Item For You</h2>

          {
            FetchedProductState !== undefined ?

              <InfiniteScroll
                dataLength={FetchedProductState.length}
                next={fetchMoreData}
                hasMore={FetchedProductState.length !== DataStatus.count}
                loader={ <div className='flex justify-center items-center'><Spin /></div>}
                endMessage={
                  <div style={{ textAlign: "center" }}>
                    <WarningTwoTone className='text-4xl' style={{ color: "gray" }}  />
                    <p className='text-gray-500 text-xl'>No More Items</p>
                  </div>
                }
              >
                <div className="mt-6  grid grid-cols-2 gap-y-8 gap-x-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-x-8">
                  {
                    FetchedProductState.map((product) => {
                      return (
                        <div key={product.id}>
                          <ProductCard product={product} />
                        </div>

                      )
                    })
                  }
                </div>
              </InfiniteScroll>
              :
              <Spin className='text-center'/>
            

          }
        </div>
      </div>
    </>
  )
}

export default DisplayItems
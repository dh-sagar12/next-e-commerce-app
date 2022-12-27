import React from 'react'
import { useState, useEffect } from 'react';
import DisplayMobileCategory from '../components/DisplayMobileCategory';
import BigScreenCategories from '../components/BigScreenCategories';
import axios  from 'axios';



const Categories = (props) => {
  const { data } = props

  const [Mobile, setMobile] = useState(true);
  const [DeviceWidth, setDeviceWidth] = useState(0)

  let toogleMobile = () => {
    let windowWidht = window.innerWidth
    if (windowWidht > 768) {
      setMobile(false)
    }
  }

  let toogleWidth = () => {
    setDeviceWidth(window.innerWidth)
  }

  // window.addEventListener('resize', toogleWidth)


  useEffect(() => {
    toogleMobile()
  }, [DeviceWidth])



  return (
    <>
      <div className=" bg-slate-50 ">
        <div className='pt-12'>
          {
            Mobile ?
              <DisplayMobileCategory /> : <BigScreenCategories PopularCategory= {data} />}
        </div>
      </div>

    </>
  )
}


export default Categories;



export const getServerSideProps = async (ctx) => {
  const base_url = process.env.baseURL
  try {
    let response = await axios.get(`${base_url}/api/categorywise-popular-items/`)
    return {
      props: {
        data: response.data
      }
    }
  } catch (error) {
    return {
      props: {
        error: error
      },
    };
  }
}
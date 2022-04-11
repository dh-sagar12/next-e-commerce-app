import React from 'react'
import { useState, useEffect } from 'react';
import DisplayMobileCategory from '../components/DisplayMobileCategory';
import BigScreenCategories from '../components/BigScreenCategories';

const Categories = () => {
  const [Mobile, setMobile] = useState(true);
  const [DeviceWidth, setDeviceWidth] = useState(0)

  let toogleMobile = () => {
    let windowWidht = window.innerWidth
    if (windowWidht > 768) {
      setMobile(false)
    }
  }

  let toogleWidth = () => {
    console.log('toogle width running');
    setDeviceWidth(window.innerWidth)
    console.log(DeviceWidth);
  }

  // window.addEventListener('resize', toogleWidth)


  useEffect(() => {
    toogleMobile()
  }, [DeviceWidth])



  return (
    <>
      <div className=" bg-slate-50 ">

        {
          Mobile ?
            <DisplayMobileCategory /> : <BigScreenCategories/>}
      </div>
    </>
  )
}

export default Categories;
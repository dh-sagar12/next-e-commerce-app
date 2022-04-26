import { useRouter } from 'next/router'
import React from 'react'
import ViewProduct from '../../components/ViewProduct';

const Slug = () => {
    let router =  useRouter();
    let {slug} =  router.query;
  return (
    <>
      <ViewProduct/>
    </>
  )
}

export default Slug;
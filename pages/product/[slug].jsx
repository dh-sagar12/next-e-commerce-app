import { useRouter } from 'next/router'
import React from 'react'

const Slug = () => {
    let router =  useRouter();
    let {slug} =  router.query;
  return (
    <div>Slug: {slug}</div>
  )
}

export default Slug;
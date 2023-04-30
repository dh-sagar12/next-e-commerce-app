import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'


const ViewOrder = () => {

    const router = useRouter()
    const { orderid } = router.query

    const [OrderData, setOrderData] = useState({})

    useEffect(() => {
        axios.get(`/api/admin/allorders/?id=${orderid}`).then(res => {
            console.log(res.data);
            setOrderData(res.data.results[0])
        }
        )

    }, [router.isReady])


    useEffect(() => {
        console.log(OrderData)
    }, [OrderData])





    return (
        <>
            <div className='text-2xl text-purple-600 font-bold p-3 m-5 border-b-2'>Order Details #{orderid}</div>

            {
                Object.keys(OrderData).map((item) => (
                    <div className='m-5  p-3'>
                        <p className='p-3  bg-slate-200'>
                            <span className='font-bold  mr-3 '>{item.toLocaleLowerCase()} :</span> {OrderData[item]}
                        </p>
                    </div>
                ))

            }


        </>
    )
}

export default ViewOrder
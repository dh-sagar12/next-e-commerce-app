import React from 'react'
import CheckOut from '../components/CheckOut';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { message } from 'antd';

const Checkout = () => {
    const [ShippingDetails, setShippingDetails] = useState([])

    useEffect(() => {
        axios.get('/api/user/shippingdetails').then(res=>{
            let shippingdetails  = res.data
            if (shippingdetails.status == 200){
                setShippingDetails(shippingdetails.data)
            }
            
        }).catch(err=>{
            message.error('server connection error')
        })
    }, [])
    

    return (
        <>
            <CheckOut  ShippingDetail  =  {ShippingDetails}/>
        </>
    )
}

export default Checkout;



import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { capturePayment } from '@/store/shop/order-slice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const PaypalReturnPage = () => {

  const dispatch = useDispatch()
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get('paymentId') || params.get('token');
  const payerId = params.get('PayerID') || params.get('payerID');

  useEffect(() =>{

    if(paymentId && payerId){
      const OrderId = JSON.parse(sessionStorage.getItem('currentOrderId'))
      

      dispatch(capturePayment({paymentId, payerId, OrderId})).then(data=>{
         console.log('Capture Response:', data);
        if(data?.payload?.success){
          sessionStorage.removeItem('currentOrderId')
          window.location.href = '/shop/payment-success'
        }
      })
    }
  }, [paymentId, payerId, dispatch])

  return (
    <Card>
    <CardHeader>
      <CardTitle>ProcessinPayment...</CardTitle>
    </CardHeader>
      
    </Card>
  )
}

export default PaypalReturnPage

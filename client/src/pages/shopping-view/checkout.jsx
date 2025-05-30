import React, { useState } from "react";
import img from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";

const Shoppingcheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const {approvalURl} =useSelector((state)=>state.shopOrder)
  const [currentSelectedAddress, setCurrentSelectedAddres] = useState(null);
  const [isPaymentStart, setIsPaymentStart] =useState(false)
  const dispatch = useDispatch()


  console.log(currentSelectedAddress, "cartItems");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem.quantity,
          0
        )
      : 0;

  function handleInitiatePaypalPayment() {
    const orderData = {
      userId: user?.id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem.price,
        quantity: singleCartItem.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      PaymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerid: "",
    };


    dispatch(createNewOrder(orderData)).then((data)=>{
      console.log(data, "dsaddad")

      if(data?.payload?.success){
        setIsPaymentStart(true)
      }else{
        setIsPaymentStart(false)
      }
    })
  }

  if(approvalURl){
    window.location.href=approvalURl
  }


  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt="banner"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address setCurrentSelectedAddres={setCurrentSelectedAddres} />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItems={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between ">
              <span className="font-bold"> Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="">
            <Button
              onClick={handleInitiatePaypalPayment}
              className="mt-4 w-full"
            >
              Check With Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shoppingcheckout;

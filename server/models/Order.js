const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  userId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      image: String,
      price: String,
      salePrice: String,
      quantity : Number
    },
  ],

  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },

  orderStatus: String,
  paymentMethod: String,
  PaymentStatus: String,
  totalAmount: Number,
  orderDate: Date,
  orderUpdateDate: Date,
  paymentId: String,
  payerid : String,
});

module.exports = mongoose.model('order', OrderSchema)

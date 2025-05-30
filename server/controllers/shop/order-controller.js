// const { PayPalEnvironment } = require("@paypal/checkout-server-sdk/lib/core/paypal_environment");


const paypal = require("@paypal/checkout-server-sdk");
const client = require("../../helpers/paypal"); // the configured PayPal client
const { OrdersCreateRequest } = paypal.orders;

const Order = require("../../models/Order");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      PaymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerid,
    } = req.body;

    const request = new OrdersCreateRequest(); 
    request.prefer("return=representation");

   const itemTotal = cartItems.reduce((total, item) => {
  return total + item.price * item.quantity;
}, 0);

request.requestBody({
  intent: "CAPTURE",
  purchase_units: [
    {
      amount: {
        currency_code: "USD",
        value: totalAmount.toFixed(2),
        breakdown: {
          item_total: {
            currency_code: "USD",
            value: itemTotal.toFixed(2),
          },
        },
      },
      items: cartItems.map((item) => ({
        name: item.title,
        sku: item.productId,
        unit_amount: {
          currency_code: "USD",
          value: item.price.toFixed(2),
        },
        quantity: item.quantity.toString(),
      })),
    },
  ],
  application_context: {
    return_url: "http://localhost:5173/shop/paypal-return",
    cancel_url: "http://localhost:5173/shop/paypal-cancel",
  },
});

    const paymentInfo = await client.execute(request);


    const newlyCreatedOrder = new Order({
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      PaymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerid,
    });

    await newlyCreatedOrder.save();

    const approvalURl = paymentInfo.result.links.find(
      (link) => link.rel === "approve"
    ).href;

    res.status(201).json({
      success: true,
      approvalURl,
      orderId: newlyCreatedOrder._id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error while creating PayPal order",
    });
  }
};


const capturePayment = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "some message occured",
    });
  }
};

module.exports = { createOrder, capturePayment };







// const paypal = require("../../helpers/paypal"); // This must export the PayPal client
// const Order = require("../../models/Order");

// const createOrder = async (req, res) => {
//   try {
//     const {
//       userId,
//       cartItems,
//       addressInfo,
//       orderStatus,
//       paymentMethod,
//       PaymentStatus,
//       totalAmount,
//       orderDate,
//       orderUpdateDate,
//       paymentId,
//       payerid,
//     } = req.body;

//     const request = new paypal.orders.OrdersCreateRequest();
//     request.prefer("return=representation");
//     request.requestBody({
//       intent: "CAPTURE",
//       purchase_units: [
//         {
//           amount: {
//             currency_code: "USD",
//             value: totalAmount.toFixed(2),
//           },
//           items: cartItems.map((item) => ({
//             name: item.title,
//             sku: item.productId,
//             unit_amount: {
//               currency_code: "USD",
//               value: item.price.toFixed(2),
//             },
//             quantity: item.quantity.toString(),
//           })),
//         },
//       ],
//       application_context: {
//         return_url: "http://localhost:5173/shop/paypal-return",
//         cancel_url: "http://localhost:5173/shop/paypal-cancel",
//       },
//     });

//     const paymentInfo = await paypal.client().execute(request);

//     const newlyCreatedOrder = new Order({
//       userId,
//       cartItems,
//       addressInfo,
//       orderStatus,
//       paymentMethod,
//       PaymentStatus,
//       totalAmount,
//       orderDate,
//       orderUpdateDate,
//       paymentId,
//       payerid,
//     });

//     await newlyCreatedOrder.save();

//     const approvalURl = paymentInfo.result.links.find(
//       (link) => link.rel === "approve"
//     ).href;

//     res.status(201).json({
//       success: true,
//       approvalURl,
//       orderId: newlyCreatedOrder._id,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error while creating PayPal order",
//     });
//   }
// };


// const capturePayment = async (req, res) => {
//   try {
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "some message occured",
//     });
//   }
// };

// module.exports = { createOrder, capturePayment };







// const paypal = require("../../helpers/paypal");
// const Order = require("../../models/Order");

// const createOrder = async (req, res) => {
//   try {
//     const {
//       userId,
//       cartItems,
//       addressInfo,
//       orderStatus,
//       paymentMethod,
//       PaymentStatus,
//       totalAmount,
//       orderDate,
//       orderUpdateDate,
//       paymentId,
//       payerid,
//     } = req.body;

//     const create_payment_json = {
//       intent: "sale",
//       payer: {
//         payment_method: "paypal",
//       },
//       redirect_urls: {
//         retrun_url: "http://localhost:5173/shop/paypal-return",
//         cancel_url: "http://localhost:5173/shop/paypal-cancel",
//       },
//       transaction: [
//         {
//           item_list: {
//             items: cartItems.map((item) => ({
//               name: item.title,
//               sku: item.productId,
//               price: item.price.toFixed(2),
//               currency: "USD",
//               quantity: item.quantity,
//             })),
//           },
//           amount: {
//             currency: "USD",
//             total: totalAmount.toFixed(2),
//           },
//           description: "description",
//         },
//       ],
//     };

//     paypal.payments.create(create_payment_json, async (error, paymentInfo) => {
//       if (error) {
//         console.log(error);

//         return res.status(500).json({
//           success: false,
//           message: "Errorwhile creating Paypal payment",
//         });
//       } else {
//         const newlyCreatedOrder = new Order({
//           userId,
//           cartItems,
//           addressInfo,
//           orderStatus,
//           paymentMethod,
//           PaymentStatus,
//           totalAmount,
//           orderDate,
//           orderUpdateDate,
//           paymentId,
//           payerid,
//         });

//         await newlyCreatedOrder.save();

//         const approvalURl = paymentInfo.links.find(
//           (link) => link.rel === "approval_url"
//         ).href;

//         res.status(201).json({
//           success: true,
//           approvalURl,
//           orderId: newlyCreatedOrder._id,
//         });
//       }
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "some message occured",
//     });
//   }
// };

// const capturePayment = async (req, res) => {
//   try {
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "some message occured",
//     });
//   }
// };

// module.exports = { createOrder, capturePayment };

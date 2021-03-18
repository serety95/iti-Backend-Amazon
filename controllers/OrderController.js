const Orders = require("../models/orderModel");
const nodemailer = require("nodemailer");

module.exports = function (app) {
  // get all
  app.get("/api/orders", function (req, res, next) {
    Orders.find({})
      .then((orders) => res.status(200).send(orders))
      .catch(next);
  });

  // find by id
  app.get("/api/order/id/:id", function (req, res, next) {
    Orders.findById({ _id: req.params.id })
      .then((order) => res.status(200).send(order))
      .catch(next);
  });

  // get user orders
  app.get("/api/user-orders/:id", (req, res, next) => {
    Orders.find({ customerId: req.params.id })
      .then((documents) => {
        console.log(documents);
        res.status(200).json({
          message: "User orders fetched successfully",
          orders: documents,
        });
      })
      .catch(next);
  });

  //  add new
  app.post("/api/order/add", (req, res, next) => {
    const order = new Orders({
      _id: req.body._id,
      orderItems: req.body.orderItems,
      orderPrice: req.body.orderPrice,
      orderHandling: req.body.orderHandling,
      orderShipping: req.body.orderShipping,
      orderTax: req.body.orderTax,
      orderDate: req.body.orderDate,
      shippingAddress: req.body.shippingAddress,
      orderStatus: req.body.orderStatus,
      customerId: req.body.customerId,
      deliveryDate: req.body.deliveryDate,
    });
    order
      .save()
      .then((createdOrder) => {
        //Email Html Body
        var tempHTMl = `<head>
<title>Rating Reminder</title>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="width=device-width" name="viewport">
<style type="text/css">
            @font-face {
              font-family: &#x27;Postmates Std&#x27;;
              font-weight: 600;
              font-style: normal;
              src: local(&#x27;Postmates Std Bold&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-bold.woff) format(&#x27;woff&#x27;);
            }

            @font-face {
              font-family: &#x27;Postmates Std&#x27;;
              font-weight: 500;
              font-style: normal;
              src: local(&#x27;Postmates Std Medium&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-medium.woff) format(&#x27;woff&#x27;);
            }

            @font-face {
              font-family: &#x27;Postmates Std&#x27;;
              font-weight: 400;
              font-style: normal;
              src: local(&#x27;Postmates Std Regular&#x27;), url(https://s3-us-west-1.amazonaws.com/buyer-static.postmates.com/assets/email/postmates-std-regular.woff) format(&#x27;woff&#x27;);
            }
        </style>
<style media="screen and (max-width: 680px)">
            @media screen and (max-width: 680px) {
                .page-center {
                  padding-left: 0 !important;
                  padding-right: 0 !important;
                }
                
                .footer-center {
                  padding-left: 20px !important;
                  padding-right: 20px !important;
                }
            }
        </style>
</head>
<body style="background-color: #f4f4f5;">
<table cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; background-color: #f4f4f5; text-align: center;">
<tbody><tr>
<td style="text-align: center;">
<table align="center" cellpadding="0" cellspacing="0" id="body" style="background-color: #fff; width: 100%; max-width: 680px; height: 100%;">
<tbody><tr>
<td>
<table align="center" cellpadding="0" cellspacing="0" class="page-center" style="text-align: left; padding-bottom: 88px; width: 100%; padding-left: 120px; padding-right: 120px;">
<tbody><tr>
<td style="padding-top: 24px;">
<img src="https://logodownload.org/wp-content/uploads/2014/04/amazon-logo-10.png" style="width: 150px;">
</td>
</tr>
<tr>
                        <td
                          colspan="2"
                          style="
                            padding-top: 72px;
                            -ms-text-size-adjust: 100%;
                            -webkit-font-smoothing: antialiased;
                            -webkit-text-size-adjust: 100%;
                            color: #cc6600;
                            font-family: 'Postmates Std', 'Helvetica',
                              -apple-system, BlinkMacSystemFont, 'Segoe UI',
                              'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
                              'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                              sans-serif;
                            font-size: 30px;
                            font-smoothing: always;
                            font-style: normal;
                            font-weight: 600;
                            text-align: center;
                            text-decoration: none;
                          "
                        >
                          Your order has been placed!
                        </td>
                      </tr>
<tr>
<td style="padding-top: 48px; padding-bottom: 48px;">
<table cellpadding="0" cellspacing="0" style="width: 100%">
<tbody><tr>
<td style="width: 100%; height: 1px; max-height: 1px; background-color: #d9dbe0; opacity: 0.81"></td>
</tr>
</tbody></table>
</td>
</tr>



<tr>
<td
  style="
    -ms-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: #000;
    font-family: 'Postmates Std', 'Helvetica',
      -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    font-size: 20px;
    font-smoothing: always;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    mso-line-height-rule: exactly;
    text-decoration: none;
    vertical-align: top;
    width: 100%;
  "
>
  Order Number #${createdOrder._id}
</td>
</tr>
<tr>
<td
  style="
    -ms-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: #000;
    font-family: 'Postmates Std', 'Helvetica',
      -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    font-size: 20px;
    font-smoothing: always;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    mso-line-height-rule: exactly;
    text-decoration: none;
    vertical-align: top;
    width: 100%;
  "
>
  Order total price: $${createdOrder.orderPrice}
</td>
</tr>
<tr>
<td
  style="
    -ms-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: #000;
    font-family: 'Postmates Std', 'Helvetica',
      -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    font-size: 20px;
    font-smoothing: always;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    mso-line-height-rule: exactly;
    text-decoration: none;
    vertical-align: top;
    width: 100%;
  "
>
  Order placed on: ${createdOrder.orderDate}
</td>
</tr>
<tr>
<td
  style="
    -ms-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: #000;
    font-family: 'Postmates Std', 'Helvetica',
      -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    font-size: 20px;
    font-smoothing: always;
    font-style: normal;
    font-weight: 400;
    line-height: 30px;
    mso-line-height-rule: exactly;
    text-decoration: none;
    vertical-align: top;
    width: 100%;
  "
>
  Expect order to be delivered on: ${createdOrder.deliveryDate}
</td>
</tr>


</tbody></table>
</td>
</tr>
</tbody></table>
<table align="center" cellpadding="0" cellspacing="0" id="footer" style="background-color: #000; width: 100%; max-width: 680px; height: 100%;">
<tbody><tr>
<td>
<table align="center" cellpadding="0" cellspacing="0" class="footer-center" style="text-align: left; width: 100%; padding-left: 120px; padding-right: 120px;">
<tbody><tr>
<td colspan="2" style="padding-top: 72px; padding-bottom: 24px; width: 100%;">
<img src="https://www.pinclipart.com/picdir/big/57-576184_view-our-amazon-storefront-amazon-logo-white-png.png" style=" height: 100px">
</td>
</tr>
<tr>
<td colspan="2" style="padding-top: 24px; padding-bottom: 48px;">
<table cellpadding="0" cellspacing="0" style="width: 100%">
<tbody><tr>
<td style="width: 100%; height: 1px; max-height: 1px; background-color: #EAECF2; opacity: 0.19"></td>
</tr>
</tbody></table>
</td>
</tr>
<tr>
<td style="-ms-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; color: #9095A2; font-family: 'Postmates Std', 'Helvetica', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; font-size: 15px; font-smoothing: always; font-style: normal; font-weight: 400; letter-spacing: 0; line-height: 24px; mso-line-height-rule: exactly; text-decoration: none; vertical-align: top; width: 100%;">
                                          If you have any questions or concerns, we're here to help. Contact us via our <a data-click-track-id="1053" href="" style="font-weight: 500; color: #ffffff" target="_blank">Help Center</a>.
                                        </td>
</tr>
<tr>
<td style="height: 72px;"></td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>
</td>
</tr>
</tbody></table>



</body>`;

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "iti.amazon.mearn@gmail.com", // generated ethereal user
            pass: "abc@@123456", // generated ethereal password
          },
        });
        console.log("mail");

        // send mail with defined transport object
        let info = transporter.sendMail({
          from: '"Amzon ITI Project" <iti.amazon.mearn@gmail.com>', // sender address
          to: "egy.mohammedmounir@gmail.com", // list of receivers // to be changed to user email
          subject: "Amazon - Your order has been placed", // Subject line
          html: tempHTMl, // html body
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        res.status(201).json({
          message: "Order added successfully",
          orderID: createdOrder._id,
        });
      })
      .catch(next);
  });

  // edit
  app.put("/api/order/:id", function (req, res, next) {
    const orderId = req.params.id;
    const order = req.body;

    Orders.findByIdAndUpdate({ _id: orderId }, order)
      .then(() => Orders.findById({ _id: orderId }))
      .then((order) => res.status(200).send(order))
      .catch(next);
  });

  // find by id and delete
  app.delete("/api/order/:id", function (req, res, next) {
    Orders.deleteOne({ _id: req.params.id }).then((order) =>
      res.status(204).send(order)
    );
  });
};

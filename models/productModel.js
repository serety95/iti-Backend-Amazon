var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Product = new Schema(
  {
    /* _id: String, */
    productId:
    {
      type: Number,
    },
    productName: {
      type: String,
    },
    productInfo: {
      /* color: {
        type: [String],
      },
      material: {
        type: String,
      },
      weight: {
        type: String,
      },
      description: {
        type: String,
      }, */
      type : []
    },
    productPrice: {
        currentPrice: {
          type: Number,
        },
        discount: {
          type: Number,
          default : 0,
        },
        finalPrice: {
          type: Number,
        },
        currency: {
          type: String,
        },
        onSale:{
          type: String,
          default : '1'
        }
    },
    productRate: {
      type: Number,
    },
    productImages: {
      type: [String],
    },
    productType: {
      type: String,
    },
    productCategory: {
      type: String,
    },                      //CategoryID
    productSubCategory: {
      type: String,
    },                      //Category -> Sub array[]
    keywords: {
      type: [String],
    },
    warehouseId: {
      type: String,
    },                      //warehouseId
    productStock: {
      type: Number,
    },
    productSales: {
      type: String,
    },                      //salesId
  }
  ,
  { collection: "Products" }
);

const Products = mongoose.model("Products", Product);

module.exports = Products;

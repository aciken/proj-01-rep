const collection = require('../DataBase/MongoDB');
const {lemonSqueeztApiInstance} = require("../utils/axios.js");

const purchaseProduct = async (req, res) => {
    try {
      const reqData = req.body;
      const email = req.body.id;
  
      console.log(reqData, email)
  
      console.log(req.body)
  
      if(!reqData.productId) 
        return res.status(400).json({message: "productId is required"});
  
        console.log('asd')
      const response = await lemonSqueeztApiInstance.post('/checkouts', {
        data: {
          type: "checkouts",
          attributes:{
            checkout_data:{
            custom:{
              user_id: email,
              amount: reqData.amount.toString(),
            },
          },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: process.env.LEMON_SQUEZZY_STORE_ID,
              },
            },
            variant: {
              data: {
                type: "variants",
                id: reqData.productId.toString(),
              },
            },
          },
        },
      });
  
      const checkoutUrl = response.data.data.attributes.url;
  
      console.log(response.data);
      console.log('yea')
  
      return res.json({checkoutUrl})
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }

module.exports = purchaseProduct;
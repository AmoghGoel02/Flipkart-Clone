
import paytmchecksum from "../paytm/PaytmChecksum.js";
import { paytmParams, paytmMerchantKey } from "../server.js";
//import { instance } from "../index.js";
export const addPaymentGateway = async(request, response) =>{
    try{
       let paytmChecksum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantKey);
       let params = {
        ...paytmParams, 'CHECKSUMHASH':paytmChecksum
       }

       response.status(200).json(params);
    }catch(error){
        response.status(500).json({error: error.message})
    }
}
/*export const checkout = async (req, res) =>{
    const options = {
        amount: 50000,  // amount in the smallest currency unit
        currency: "INR",
      };
      const order = await instance.orders.create(options)

      console.log(order);
      res.status(200).json({success:true})
};*/

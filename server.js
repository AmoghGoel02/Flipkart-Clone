import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import {v4 as uuid} from 'uuid';
//import Razorpay from 'razorpay'

import Connection  from './database/db.js';
import DefaultData from './default.js';
import router from './routes/route.js';

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/',router);

const PORT =process.env.PORT||8000;

const USERNAME= process.env.DB_USERNAME;
const PASSWORD= process.env.DB_PASSWORD;

const URL = process.env.MONGODB_URI||`mongodb+srv://${USERNAME}:${PASSWORD}@ecommerce-web.ezppzln.mongodb.net/ECOMMERCE?retryWrites=true&w=majority`;


Connection(URL);

if(process.env.NODE_ENV ==='production'){
  app.use(express.static('client/build'))
}

app.listen(PORT, ()=>console.log(`Server is running successfully on PORT ${PORT}`));

DefaultData();

/*export const instance = new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET_KEY
  });
*/
export let paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID']= process.env.PAYTM_MID;
paytmParams['WEBSITE']= process.env.PAYTM_WEBSITE;
paytmParams['CHANNEL_ID']= process.env.PAYTM_CHANNEL_ID;
paytmParams['INDUSTRY_TYPE_ID']= process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams['ORDER_ID']= uuid();
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID;
paytmParams['TXN_AMOUNT'] = '100';
paytmParams['CALLBACK_URL'] = 'callback';
paytmParams['EMAIL'] = 'amoghgoel4802@gmail.com';
paytmParams['MOBILE_NO'] = '1234567890';



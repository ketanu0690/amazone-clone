const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    'sk_test_51L5shmSHSqj4QW4359cn03VzjL5I1QVIlKQgDsQJyGzVCn2Oo2yHi09Lcezl2JfIWOVWABsFqpqGNwACtA3avDgW00EUqyWqck'
);


const app = express();

app.use(cors({origin:true}))
app.use(express.json());


app.get('/',(req,res)=>{
    res.status(200).send("hello world");
} )

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;

    console.log("Payment Request Recieved");

    console.log(req.query);
    console.log(req.body);
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});


exports.api = functions.https.onRequest(app);

//Api end point
// http://localhost:5001/clone-5e19f/us-central1/api

const express = require("express")
const path = require("path")
const Razorpay = require("razorpay")
const shortid = require("shortid")
const cors =require("cors")

const app = express()

app.use(cors())
const port = 3001

//  This is for test payment.
// const razorpay = new Razorpay({
//     key_id:"rzp_test_fQrGAle5CT340z",
//     key_secret:"byuE1LPlPeUbGVUiGIGxGUHN"
// })

// this is for live payment
const razorpay = new Razorpay({
    key_id:"rzp_live_uKSJibiIsUbyDI",
    key_secret:"agBXSDk5DuUZ074PlRcMNjto"
})

app.post("/razorpay", async (req, res)=>{

    const payment_capture = 1
    const amount = 10
    const currency = "INR"

    const options = {
        amount: amount*100,
        currency,
        receipt:shortid.generate(),
        payment_capture
    }

    const response = await razorpay.orders.create(options)
    console.log(response)
    res.json({
        id:response.id,
        currency:response.currency,
        amount:response.amount
    })
})

// this will send the logo file to the frontend as a get request.
app.get("/logo.svg", (req, res)=>{
    res.sendFile(path.join(__dirname,"logo.svg"))
})

// This Will start the server on port 3001
app.listen(port, ()=>{
    console.log("Listening on 3001")
})
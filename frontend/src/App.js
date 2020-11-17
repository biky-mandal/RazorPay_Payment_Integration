import React from 'react';
import logo from './logo.svg';
import './App.css';

function loadRazorpay(src){
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () =>{
      resolve(true)
    }
    script.onerror = () =>{
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

const _KEY_ = document.domain === "localhost"

function App() {

  async function displayRazorpay(){

    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js")

    if(!res){
      alert("Payment Div Failed to load. Are You Online?")
      return
    }

    const data = await fetch("http://localhost:3001/razorpay", {method: "POST"})
                      .then(
                        (t)=>t.json()
                      )

    var options = {
      "key": _KEY_ ? "rzp_live_uKSJibiIsUbyDI":"_DEV_KEY_", // Enter the Key ID generated from the Dashboard
      "amount": data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": data.currency,
      "name": "Acme Corp",
      "description": "Test Transaction",
      "image": "http://localhost:3001/logo.svg",
      "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
      },
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9999999999"
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#F37254"
      }
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick={displayRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pay Now
        </a>
      </header>
    </div>
  );
}

export default App;

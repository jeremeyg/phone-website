import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Checkout ({ userId, fetchCartInfo }){
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setLoading(false);

      Swal.fire({
          title: 'Thank you for your order!',
          icon: 'success',
          text: 'Your order has been successfully placed.'
        })
      fetchCartInfo();
    })
    .catch(error => {
      console.error("Error during checkout:", error);
      setLoading(false);
    });
  };

    const clearCart = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/clearCart`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userId: userId }),
    })
    .then(res => res.json())
    .then(data => {
      if(data.error === "Cart Not Found") {
        Swal.fire({
          title: 'Cart Not Found',
          icon: 'error',
          text: 'Error in finding cart.'
        });
      } else if (data.error === "Internal Server Error") {
        Swal.fire({
          title: 'Internal Server Error',
          icon: 'error',
          text: 'Something went wrong.'
        });
      } else {
        Swal.fire({
          title: 'Clear Cart',
          icon: 'success',
          text: 'Cart successfully cleared.'
        });  
        fetchCartInfo();
      }  
    });
  };


  return (
    <>
    <div className="d-flex justify-content-between">
    <button
      className="btn btn-secondary mb-5"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Checkout'}
    </button>
    <button className="btn btn-secondary mb-5" 
      onClick={clearCart} 
      disabled={loading}>Clear Cart
    </button>
    </div>
    </>
  );
};
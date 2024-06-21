import React, { useEffect, useState } from 'react';
import { Wrapper } from './Wrapper';

export const Orders = () => {
  const [id, setId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('Buy your favorite product');

  useEffect(() => { 
    (async () => {
        try {
            if (id) {
                const response = await fetch('http://localhost:8000/products/${id}');
                const content = await response.json();
                const price = parseFloat(content.price) =1.2;
                setMessage('your product price is $${price}');
            }
        } catch(e) {
            setMessage('Buy your favorite product')
        }
    })

  },[id]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8001/orders', {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          id,
          quantity
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setMessage('Thank you for your order!');
    } catch (error) {
      setMessage('There was a problem with your order. Please try again.');
      console.error('There was an error!', error);
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <main>
          <div className="py-5 text-center">
            <h2>Checkout form</h2>
            <p className="lead">{message}</p>
          </div>

          <form onSubmit={submit}>
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="form-label">Product</label>
                <input
                  className="form-control"
                  value={id}
                  onChange={e => setId(e.target.value)}
                />
              </div>

              <div className="col-sm-6">
                <label className="form-label">Quantity</label>
                <input
                  className="form-control"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                />
              </div>
            </div>
            <hr className="my-4" />
            <button className="w-100 btn btn-primary btn-lg" type="submit">
              Buy
            </button>
          </form>
        </main>
      </div>
    </Wrapper>
  );
};


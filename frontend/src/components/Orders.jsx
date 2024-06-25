import React, { useState, useEffect } from "react";
import { Wrapper } from "./Wrapper";
import { useParams } from "react-router-dom";

export const Orders = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState('Buy your favorite product');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:8000/products/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch product details");
          }
          const content = await response.json();
          setProduct(content);
        }
      } catch (e) {
        setMessage('Buy your favorite product');
        console.error(e);
      }
    })();
  }, [id]);

  useEffect(() => {
    if (product) {
      const fee = parseFloat(product.price) * 0.2;
      const price = (fee + parseFloat(product.price)) * quantity;
      setMessage(`Your product price is $${price.toFixed(2)}`);
    }
  }, [quantity, product]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await fetch('http://localhost:8001/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          quantity
        })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setTimeout(() => {
        setLoading(false); // Set loading to false after 3 seconds
        setMessage("Thank you for your order!");
      }, 3000);
    } catch (error) {
      setLoading(false); // Set loading to false immediately if there's an error
      setMessage("There was a problem with your order. Please try again.");
      console.error("There was an error!", error);
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

          {loading ? (
            <div className="text-center">
              <h4>Your order is processing...</h4>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="form-label">Product</label>
                  <input
                    className="form-control"
                    value={product ? product.name : ""}
                    disabled
                  />
                </div>

                <div className="col-sm-6">
                  <label className="form-label">Quantity</label>
                  <input
                    className="form-control"
                    value={quantity}
                    type="number"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
              <hr className="my-4" />
              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Buy
              </button>
            </form>
          )}
        </main>
      </div>
    </Wrapper>
  );
};


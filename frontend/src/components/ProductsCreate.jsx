import { useState } from "react";
import { Wrapper } from "./Wrapper";
import { useNavigate } from "react-router-dom";

export const ProductsCreate = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8000/products", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        quantity,
      }),
    });
    await navigate(-1);
  };

  return (
    <Wrapper>
      <form className="mt-3" onSubmit={submit}>
        <div className="form-floating pb-3">
          <input
            className="form-control"
            placeholder="Name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating pb-3">
          <input
            className="form-control"
            placeholder="Price"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="price">Price</label>
        </div>
        <div className="form-floating pb-3">
          <input
            className="form-control"
            placeholder="Quantity"
            id="quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <label htmlFor="quantity">Quantity</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>
    </Wrapper>
  );
};

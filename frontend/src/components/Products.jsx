import { useState, useEffect } from "react";
import { Wrapper } from "./Wrapper";
import { Link, useNavigate } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const history = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/products");
      const content = await response.json();
      setProducts(content);
      setLoading(false); // Set loading to false after fetching products
    })();
  }, []);
  
  const buy = (id) => {
    // Redirect to the orders page with product id
    history(`/orders/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading text while fetching products
  }

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <h1 to={'/create'} className="btn btn-sm btn-outline-secondary">WELCOME TO OUR SHOP</h1>
      </div>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card mb-4 shadow-sm">
              {product.image_url ? (
                <img src={product.image_url} className="card-img-top" alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
              ) : (
                <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span>Loading image...</span> {/* Show loading text for image */}
                </div>
              )}
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price + (0.2 * product.price)}</p>
                <p className="card-text">Quantity: {product.quantity}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => buy(product.id)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

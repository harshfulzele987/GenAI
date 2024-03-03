import React, { useState } from 'react';
import axios from 'axios';

const ProductCard = ({ product, authToken }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8081/api/cart/add',
        new URLSearchParams({
          userId: getUserIdSomehow(), // Replace with the actual user ID
          productId: product.id,
          quantity: quantity,
        }),
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error('Error adding to cart:', error.message);
    }
  };

  const getUserIdSomehow = () => {
    // Replace with your actual logic to get the user ID
    return 1; // Replace with your logic
  };

  return (
    <div className="card">
      <img src={product.img} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        <p className="card-text">{product.description}</p>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className="input-group-append">
            <button className="btn btn-success" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

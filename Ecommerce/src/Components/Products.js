import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import Header from './Header';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const toggleCart = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/cart/${getUserIdSomehow()}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCartData(response.data);
      calculateTotalPrice(response.data);
      setShowCart(!showCart);
    } catch (error) {
      setError('Failed to fetch cart data.');
      console.error('Fetch cart data error:', error.message);
    }
  };

  const calculateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const getUserIdSomehow = () => {
    // Replace with your actual logic to extract the user ID
    // This could be from the token or any other authentication mechanism
    return 1; // Replace with your logic
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
  
      // Check if token exists
      if (!token) {
        // Handle the case where there's no token (e.g., display error message)
        console.error('No token found in local storage.');
        return; // Exit the function if no token is available
      }
  
      const response = await axios.delete(
        'http://localhost:8081/api/cart/remove', // Replace with your actual API endpoint
        new URLSearchParams({ productId }), // Send product ID in data
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );
  
      if (response.ok) {
        // Successful removal
        console.log('Item removed from cart successfully.');
        // Update cart state or UI (e.g., remove item from displayed cart)
        toggleCart(); // Assuming this function updates your cart state or UI
      } else {
        // Handle non-200 status codes (e.g., 401, 403)
        console.error('Error removing from cart:', response.statusText);
        // Handle UI feedback based on the error (e.g., display error message)
      }
    } catch (error) {
      console.error('Error removing from cart:', error.message);
      // Handle unexpected errors (e.g., network issues)
    }
  };
  
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/product', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        setError('Failed to fetch products.');
        console.error('Fetch products error:', error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-primary" onClick={toggleCart}>
        View Cart
      </button>
      <Header></Header>
      {showCart && (
        <div className="cart-container">
          <h2>Cart</h2>
          <ul className="list-group">
            {cartData.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                {item.product.name} - Quantity: {item.quantity}
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
      )}
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-3">
            <ProductCard product={product} authToken={localStorage.getItem('token')} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

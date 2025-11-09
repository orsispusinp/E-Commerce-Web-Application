import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch {
      alert("Please login first");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (!cart) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.items.map((item) => (
          <div className="cart-item" key={item.product._id}>
            <span>{item.product.name}</span>
            <span>
              ₹{item.product.price} × {item.quantity}
            </span>
          </div>
        ))
      )}
      {cart.items.length > 0 && (
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      )}
    </div>
  );
};

export default Cart;

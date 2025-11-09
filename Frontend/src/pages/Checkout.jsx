import API from "../api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const res = await API.post("/orders/checkout");
      alert(`Order Successful! Total: ₹${res.data.totalAmount}`);
      navigate("/");
    } catch {
      alert("Checkout failed");
    }
  };

  return (
    <div className="container checkout-container">
      <h2>Checkout</h2>
      <p>Confirm your order below.</p>
      <button onClick={handleCheckout}>Confirm Order (Free)</button>
    </div>
  );
};

export default Checkout;

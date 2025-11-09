import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import nodemailer from "nodemailer";

export const checkout = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    // Calculate total
    const totalAmount = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    // Simulate payment success
    const paymentSuccess = true;
    if (!paymentSuccess)
      return res.status(400).json({ message: "Payment failed" });

    // Create new order
    const order = new Order({
      user: userId,
      items: cart.items,
      totalAmount,
      paymentStatus: "Paid"
    });
    await order.save();

    // Clear cart after successful order
    cart.items = [];
    await cart.save();

    // Send confirmation email
    await sendConfirmationEmail(req.user.email, order._id, totalAmount);

    res.status(200).json({
      message: "Order placed successfully",
      orderId: order._id,
      totalAmount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function: Send confirmation email
const sendConfirmationEmail = async (toEmail, orderId, totalAmount) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: "Order Confirmation",
      html: `
        <h3>Order Confirmation</h3>
        <p>Thank you for your purchase!</p>
        <p>Order ID: <b>${orderId}</b></p>
        <p>Total Amount: ₹${totalAmount}</p>
        <p>Status: <b>Paid</b></p>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

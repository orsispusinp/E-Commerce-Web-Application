import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// ✅ Add item to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT
    const { productId, quantity = 1 } = req.body;

    // 🧠 Validate productId
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // 🧠 Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🧠 Fetch user's cart (always return a Mongoose doc)
    let cart = await Cart.findOne({ user: userId });
    console.log("🟢 Cart Type:", cart?.constructor?.name, "Has items:", Array.isArray(cart?.items));


    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // 🧠 Compare product IDs safely (handle ObjectId or populated product)
    const itemIndex = cart.items.findIndex((item) => {
      const existingId = item.product?._id
        ? item.product._id.toString()
        : item.product.toString();
      return existingId === productId;
    });

    // 🧠 Update or Add product
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    // 🧠 Save and return updated cart
    await cart.save();

    res.status(200).json({
      message: "Item added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("❌ AddToCart Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get user's cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("❌ GetCart Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // 🧠 Filter out the product
    cart.items = cart.items.filter((item) => {
      const existingId = item.product?._id
        ? item.product._id.toString()
        : item.product.toString();
      return existingId !== productId;
    });

    await cart.save();

    res.status(200).json({
      message: "Item removed successfully",
      cart,
    });
  } catch (error) {
    console.error("❌ RemoveFromCart Error:", error);
    res.status(500).json({ message: error.message });
  }
};

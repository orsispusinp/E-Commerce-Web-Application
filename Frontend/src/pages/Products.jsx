import { useQuery } from "@tanstack/react-query";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  // React Query hook for products
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await API.get("/products");
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
    cacheTime: 10 * 60 * 1000 // keep cached data for 10 mins
  });

  const addToCart = async (productId) => {
    try {
      await API.post("/cart/add", { productId, quantity: 1 });
      alert("Added to cart");
      navigate("/cart");
    } catch {
      alert("Please login first");
      navigate("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500"></div>
      </div>
    );
  }

  if (isError) return <p className="text-center mt-10 text-red-500">Error loading products</p>;

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

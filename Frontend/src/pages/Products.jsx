import { useQuery } from "@tanstack/react-query";
import API from "../api";
import { useNavigate } from "react-router-dom";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img shimmer"></div>
      <div className="skeleton-line shimmer"></div>
      <div className="skeleton-line shimmer short"></div>
      <div className="skeleton-btn shimmer"></div>
    </div>
  );
};

const Products = () => {
  const navigate = useNavigate();

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await API.get("/products");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
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
    // Show shimmer placeholders while products load
    return (
      <div className="container">
        <h2>Products</h2>
        <div className="products-grid">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
      </div>
    );
  }

  if (isError)
    return <p className="error-text">Error loading products</p>;

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

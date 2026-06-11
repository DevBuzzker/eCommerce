import { useEffect, useState } from "react";
import { NavLink } from "react-router";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(async (res) => {
        if (!res.ok) throw new Error("Something went wrong");
        const json = await res.json();
        console.log(json);
        setProducts(json);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const toggleAddToCart = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <div>
      <h2>Products</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <NavLink to={"products/" + product.id}>
              <h3>{product.title}</h3>
            </NavLink>
            <p style={{ color: "#666", fontSize: "14px", minHeight: "40px" }}>
              {product.description.slice(0, 100)}...
            </p>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              ${product.price}
            </p>
            <button
              onClick={() => toggleAddToCart(product.id)}
              style={{
                padding: "8px 16px",
                backgroundColor: cart[product.id] ? "lightgreen" : "#e0e0e0",
                // color: cart[product.id] ? "white" : "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {cart[product.id] ? "✔️ In cart" : "➕ Add to cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

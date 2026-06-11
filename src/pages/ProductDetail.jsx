import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/" + id)
      .then(async (res) => {
        if (!res.ok) throw new Error("Something went wrong");
        const productJson = await res.json();
        setProduct(productJson);
      })
      .catch((ex) => {
        console.log(ex);
        setError(ex.message);
      });
  }, [id]);

  if (error) return <div><h2>Error: {error}</h2></div>;
  if (!product) return <div><h2>Loading...</h2></div>;

  return (
    <div>
      <h2>{product.title}</h2>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default ProductDetail;

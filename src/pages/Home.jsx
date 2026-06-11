import { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState({});
  fetch("https://fakestoreapi.com/products")
    .then(async (res) => {
      if (!res.ok) throw new Error("Something went wrong");
      const json = await res.json();
      console.log(json);
      setProducts(json);
      return json;
    })
    .catch((e) => {
      console.error(e);
    });

  useEffect(() => {}, [products]);

  return (
    <div>
      <h2>Products</h2>
      <div></div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import ProductCard from "../../../components/ProductCard";
import { getAllProducts } from "../../../utils";

function Feed() {
  const [products, setproducts] = useState(null);

  useEffect(() => {
    try {
      const populateProducts = async () => {
        const res = await getAllProducts();
        setproducts(res);
      };
      populateProducts();
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  return (
    <div className="flex flex-wrap justify-around">
      {products &&
        products.map((item) => (
          <ProductCard
            key={item.id}
            img={item.img}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
    </div>
  );
}

export default Feed;

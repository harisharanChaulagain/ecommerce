import React, { useEffect } from "react";
import "./Category.scss";
import Products from "../Products/Products";
import { useProduct } from "../../api/GetApi";
import { useParams } from "react-router-dom";

const Category = () => {
  const { data: productData, isLoading, isError } = useProduct();
  const { id }: any = useParams();
  const formattedId = id.replace(/\s/g, "-");

  useEffect(() => {
    const scrollToCategory = document.getElementById(formattedId);
    if (scrollToCategory) {
      scrollToCategory.scrollIntoView({ behavior: "smooth" });
    }
  }, [formattedId]);

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (isError) {
    return <div>Error fetching products from API</div>;
  }

  const groupedProducts = groupProductsByCategory(productData);

  return (
    <div className="category-main-content">
      <div className="layout">
        {Object.entries(groupedProducts).map(([category, products]) => (
          <div key={category} id={`${`${category.replace(/\s/g, "-")}`}`}>
            <div className="category-title">{category}</div>
            <Products
              headingText={category}
              innerPage={true}
              products={products}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const groupProductsByCategory = (products: any) => {
  return products.reduce((acc: any, product: any) => {
    const category = product.category;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(product);
    return acc;
  }, {});
};

export default Category;

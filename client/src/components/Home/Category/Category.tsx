import React from "react";
import "./Category.scss";
import { useCategory } from "../../../api/GetApi";
import { Link } from "react-router-dom";

const Category = () => {
  const { data: categoryData, isLoading, isError } = useCategory();

  if (isLoading) {
    return <div>Loading category data...</div>;
  }

  if (isError) {
    return <div>Error fetching category data from API</div>;
  }

  return (
    <div className="shop-by-category">
      <div className="sec-heading">Categories</div>
      <div className="categories">
        {categoryData.map((category: any, index: number) => (
          <Link
            to={`/category/${category.name}`}
            key={index}
            className="category"
          >
            <img
              src={`../../../../public/category/${
                category.image.split("/")[2]
              }`}
              alt={`Category ${index + 1}`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;

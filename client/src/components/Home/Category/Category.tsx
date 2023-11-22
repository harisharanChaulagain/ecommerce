import React from "react";
import "./Category.scss";
import { useCategory } from "../../../api/GetApi";

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
      <div className="categories">
        {categoryData.map((category: any, index: number) => (
          <div key={index} className="category">
            <img
              src={`../../../../public/category/${
                category.image.split("/")[2]
              }`}
              alt={`Category ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

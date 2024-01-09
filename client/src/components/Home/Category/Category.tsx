import React from "react";
import "./Category.scss";
import { useCategory } from "../../../api/GetApi";
import { Link } from "react-router-dom";
import { bufferToDataURL } from "../../../utils/imageUtils";

export interface ICategory {
  name: string;
  image: { data: Buffer };
  _id: string;
  itemCount: number;
}

const Category = () => {
  const { data: categoryData, isLoading, isError } = useCategory();

  if (isLoading) {
    return <div>Loading category data...</div>;
  }

  if (isError) {
    return <div>Error fetching category data from API</div>;
  }
  console.log("categoryData", categoryData);

  return (
    <div className="shop-by-category">
      <div className="sec-heading">Categories</div>
      <div className="categories">
        {categoryData.map((category: ICategory, index: number) => (
          <Link
            to={`/category/${category.name}`}
            key={index}
            className="category"
          >
            {category?.image?.data && (
              <img
                src={bufferToDataURL(category?.image?.data)}
                alt={category?.name}
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;

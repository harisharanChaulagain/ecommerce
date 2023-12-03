import React from "react";
import "./RelatedProducts.scss";
import Products from "../../Products/Products";
import { useProduct } from "../../../api/GetApi";

interface CurrentProductCategoryProps {
  currentProductCategory: string;
}

const RelatedProducts: React.FC<CurrentProductCategoryProps> = ({
  currentProductCategory,
}) => {
  const { data: productData } = useProduct();

  const relatedProducts = productData.filter(
    (product: any) => product.category === currentProductCategory
  );

  return (
    <div>
      <Products
        innerPage={false}
        products={relatedProducts}
        headingText="Related Products"
      />
    </div>
  );
};

export default RelatedProducts;

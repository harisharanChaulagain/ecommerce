import React from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import "../../Category/CategoryTable/CategoryTable.scss";
import { useProduct } from "../../../api/GetApi";

const CategoryTable = () => {
  const { data: productData, isLoading } = useProduct();
  if (isLoading) {
    return <div>Table data is Loading....</div>;
  }

  return (
    <div className="table-main">
      <table>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Remaining Quantity</th>
            <th>Product Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((item: any, index: number) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.units}</td>
              <td className="img-container">
                <img
                  src={`../../../../public/product/${
                    item.image?.split("/")[2]
                  }`}
                  alt="img"
                />
              </td>
              <td>
                <span className="action-button delete">
                  <MdDelete />
                </span>
                <span className="action-button edit">
                  <FaRegEdit />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;

import React from "react";
import "./CategoryTable.scss";
import { useCategory } from "../../../api/GetApi";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useDeleteCategory } from "../../../api/DeleteApi";

const CategoryTable = () => {
  const { data: categoryData, isLoading } = useCategory();
  const { mutation: deleteCategory } = useDeleteCategory();
  if (isLoading) {
    return <div>Table data is Loading....</div>;
  }
  const handleDelete = async (categoryId: string) => {
    try {
      const userConfirmed = window.confirm("Are you sure to delete?");
      if (userConfirmed) {
        await deleteCategory.mutate(categoryId);
      }
    } catch (error) {}
  };

  return (
    <div className="table-main">
      <table>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Product Category</th>
            <th>Category Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryData.map((item: any, index: number) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td className="img-container">
                <img
                  src={`../../../../public/category/${
                    item.image?.split("/")[2]
                  }`}
                  alt="img"
                />
              </td>
              <td>
                <span
                  className="action-button delete"
                  onClick={() => handleDelete(item._id)}
                >
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

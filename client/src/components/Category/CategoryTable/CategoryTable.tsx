import React, { useState, useContext } from "react";
import "./CategoryTable.scss";
import { useCategory } from "../../../api/GetApi";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useDeleteCategory } from "../../../api/DeleteApi";
import { Context } from "../../../utils/context";
import NewCategory from "../NewCategory/NewCategory";
import { ICategory } from "../../Home/Category/Category";

const CategoryTable = () => {
  const { data: categoryData, isLoading, refetch } = useCategory();
  const { mutation: deleteCategory } = useDeleteCategory();
  const { setNewCategory, isUpdate, setIsUpdate, newCategory }: any =
    useContext(Context);

  const handleDelete = async (categoryId: string) => {
    try {
      const userConfirmed = window.confirm("Are you sure to delete?");
      if (userConfirmed) {
        await deleteCategory.mutate(categoryId, {
          onSuccess: () => {
            refetch();
          },
        });
      }
    } catch (error) {}
  };

  const [selectedItemId, setSelectedItemId] = useState(null);
  const handleEdit = (itemId: any) => {
    setNewCategory(true);
    setSelectedItemId(itemId);
    setIsUpdate(true);
  };

  const renderContent = () => {
    if (isLoading) {
      return <div>Table data is Loading....</div>;
    }

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
            {categoryData.map((item: ICategory, index: number) => (
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
                  <span
                    className="action-button edit"
                    onClick={() => handleEdit(item._id)}
                  >
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
  return (
    <div className="table-main">
      {renderContent()}
      {newCategory && (
        <NewCategory isUpdate={isUpdate} categoryId={selectedItemId} />
      )}
    </div>
  );
};

export default CategoryTable;

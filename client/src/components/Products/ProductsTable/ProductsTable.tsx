import React, { useState, useContext } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import "../../Category/CategoryTable/CategoryTable.scss";
import { useProduct } from "../../../api/GetApi";
import { useDeleteProduct } from "../../../api/DeleteApi";
import NewProduct from "../NewProduct/NewProduct";
import { Context } from "../../../utils/context";
import { bufferToDataURL } from "../../../utils/imageUtils";

const ProductTable = () => {
  const { data: productData, isLoading, refetch } = useProduct();
  const { mutation: deleteProduct } = useDeleteProduct();
  const { setNewProduct, isUpdate, setIsUpdate, newProduct }: any =
    useContext(Context);

  const handleDelete = async (productId: string) => {
    try {
      const userConfirmed = window.confirm("Are you sure to delete?");
      if (userConfirmed) {
        await deleteProduct.mutate(productId, {
          onSuccess: () => {
            refetch();
          },
        });
      }
    } catch (error) {}
  };

  const [selectedItemId, setSelectedItemId] = useState(null);
  const handleEdit = (itemId: any) => {
    setNewProduct(true);
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
                    src={bufferToDataURL(item?.image?.data)}
                    alt={item?.name}
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
      {newProduct && (
        <NewProduct isUpdate={isUpdate} productId={selectedItemId} />
      )}
    </div>
  );
};

export default ProductTable;

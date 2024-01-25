import React, { useEffect } from "react";
import { useInvoice } from "../../../api/GetApi";
import "./InvoiceTable.scss";

interface INVOICEPROPS {
  storedProductIds: string[];
  storedProductQuantities: string[];
  updateTotal: (newTotal: number) => void;
}

const InvoiceTable: React.FC<INVOICEPROPS> = ({
  storedProductIds,
  storedProductQuantities,
  updateTotal,
}) => {
  const { data: invoiceData } = useInvoice(storedProductIds);

  useEffect(() => {
    const newTotal = invoiceData?.reduce(
      (acc: number, item: any, index: number) =>
        acc +
        (storedProductQuantities &&
          parseInt(storedProductQuantities[index], 10) * item?.price),
      0
    );
    updateTotal(newTotal);
  }, [invoiceData, storedProductQuantities, updateTotal]);

  return (
    <div className="invoice-table">
      <table>
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Description</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData &&
            invoiceData?.length > 0 &&
            invoiceData?.map((item: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item?.name}</td>
                <td>{item?.price}</td>
                <td>
                  {storedProductQuantities && storedProductQuantities[index]}
                </td>
                <td>
                  {storedProductQuantities &&
                    parseInt(storedProductQuantities[index], 10) * item?.price}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;

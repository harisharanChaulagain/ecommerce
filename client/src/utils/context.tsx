import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface ContextValue {
  newCategory: boolean;
  newProduct: boolean;
  clearCart: boolean;
  productQuantities: number[];
  productIds: (string | null)[];
  setNewCategory: Dispatch<SetStateAction<boolean>>;
  setNewProduct: Dispatch<SetStateAction<boolean>>;
  setProductQuantities: Dispatch<SetStateAction<number[]>>;
  setProductIds: Dispatch<SetStateAction<(string | null)[]>>;
  setClearCart: Dispatch<SetStateAction<boolean>>;
}

export const Context = createContext<ContextValue | undefined>(undefined);

interface AppContextProps {
  children: ReactNode;
}

export const AppContext: React.FC<AppContextProps> = ({ children }) => {
  const [newCategory, setNewCategory] = useState(false);
  const [newProduct, setNewProduct] = useState(false);
  const [productQuantities, setProductQuantities] = useState<number[]>([]);
  const [productIds, setProductIds] = useState<(string | null)[]>([]);
  const [clearCart, setClearCart] = useState(false);

  const contextValue: ContextValue = {
    newCategory,
    newProduct,
    productQuantities,
    productIds,
    clearCart,
    setNewCategory,
    setNewProduct,
    setProductQuantities,
    setProductIds,
    setClearCart,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default AppContext;

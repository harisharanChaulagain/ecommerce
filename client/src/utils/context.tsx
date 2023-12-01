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
  productQuantities: number[];
  productIds: (string | null)[];
  setNewCategory: Dispatch<SetStateAction<boolean>>;
  setNewProduct: Dispatch<SetStateAction<boolean>>;
  setProductQuantities: Dispatch<SetStateAction<number[]>>;
  setProductIds: Dispatch<SetStateAction<(string | null)[]>>;
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

  const contextValue: ContextValue = {
    newCategory,
    newProduct,
    productQuantities,
    productIds,
    setNewCategory,
    setNewProduct,
    setProductQuantities,
    setProductIds,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default AppContext;

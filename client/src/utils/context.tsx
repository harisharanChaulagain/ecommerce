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
  setNewCategory: Dispatch<SetStateAction<boolean>>;
  setNewProduct: Dispatch<SetStateAction<boolean>>;
}

export const Context = createContext<ContextValue | undefined>(undefined);

interface AppContextProps {
  children: ReactNode;
}

export const AppContext: React.FC<AppContextProps> = ({ children }) => {
  const [newCategory, setNewCategory] = useState(false);
  const [newProduct, setNewProduct] = useState(false);

  const contextValue: ContextValue = {
    newCategory,
    newProduct,
    setNewCategory,
    setNewProduct,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default AppContext;

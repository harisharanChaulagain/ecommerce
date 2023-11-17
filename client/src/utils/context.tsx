import React, { createContext, ReactNode } from "react";

interface AppContextProps {
  children: ReactNode;
}

interface ContextValue {}

export const Context = createContext<ContextValue | undefined>(undefined);

const AppContext: React.FC<AppContextProps> = ({ children }) => {
  const contextValue: ContextValue = {};

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default AppContext;

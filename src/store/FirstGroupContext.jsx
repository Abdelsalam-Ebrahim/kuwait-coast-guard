import { createContext, useContext } from "react";

export const FirstGroupContext = createContext({
  employee: null,
  updateEmployee: () => {},
  
});

function FirstGroupProvider({ children }) {

  const value = {
  };

  return <FirstGroupContext.Provider value={value}>{children}</FirstGroupContext.Provider>;
}

export function useFirstGroup() {
  return useContext(FirstGroupContext);
}

export default FirstGroupProvider;
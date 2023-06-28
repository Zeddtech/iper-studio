import { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  console.log("UserContextProvider rendered ");
  const [userData, setUserData] = useState();

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
const useGcontex = () => {
  console.log("useGcontex rendered ");
  return useContext(UserContext);
};

export { UserContext, useGcontex };

import React, { useState, useEffect } from "react";
import UserContext from "./userContext";

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  // Initialize user state from localStorage
  const initialUser = JSON.parse(localStorage.getItem("user")) || null;

  const [user, setUser] = useState(initialUser);

  // Use useEffect to update localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

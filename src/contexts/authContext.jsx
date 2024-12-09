import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  const isLoggedIn = !!currentUser;

  // Signup function
  const signup = (firstname, lastname, email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = storedUsers.find((user) => user.email === email);

    if (userExists) {
      throw new Error("Email is already registered. Please log in.");
    }

    const newUser = { firstname, lastname, email, password };
    const updatedUsers = [...storedUsers, newUser];

    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setCurrentUser({ firstname, lastname, email });
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ firstname, lastname, email })
    );
  };

  // Login function
  const login = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    setCurrentUser({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      })
    );
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoggedIn, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

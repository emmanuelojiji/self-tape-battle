import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [storedUserId, setStoredUserId] = useState(
    localStorage.getItem("userId")
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        const uid = user.uid;
        localStorage.setItem("userId", uid); // Store only the UID
        setStoredUserId(uid); // Update the storedUserId state
      } else {
        setUser(null);
        localStorage.removeItem("userId");
        setStoredUserId(null); // Update the storedUserId state
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, storedUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

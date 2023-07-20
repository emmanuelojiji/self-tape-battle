import { createContext } from "react";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

export const authContext = createContext("");


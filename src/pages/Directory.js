import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { db } from "../firebaseConfig";
import "./Directory.scss";

const Directory = () => {
  const usersRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const usersDocs = await getDocs(usersRef);
      const user = usersDocs.docs.map((doc) => doc.data());
      console.log(user);
      setUsers(user);
      console.log(users);
    } catch {
      console.log("Sorry couldn't get users");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <h1 className="page-title">Directory</h1>
      <input
        type="text"
        className="search directory-search"
        placeholder="Search for user"
      ></input>

      {users.map((user) => (
        <UserCard firstName={user.first_name} lastName={user.last_name} role={user.role} />
      ))}
    </div>
  );
};

export default Directory;

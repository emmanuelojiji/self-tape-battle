import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { db } from "../firebaseConfig";
import "./Directory.scss";

const Directory = ({ setCurrentPage, setSlidePosition }) => {
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
    setCurrentPage("directory");
    setSlidePosition(80 * 3);
    getUsers();
  }, []);

  const [userInput, setUserInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleUserSearch = () => {
    const filteredUsers = users.filter(
      (user) =>
        user.first_name?.toLowerCase().includes(userInput?.toLowerCase()) ||
        user.last_name?.toLowerCase().includes(userInput?.toLowerCase())
    );
    return filteredUsers;
  };

  const displayedUsers = userInput ? handleUserSearch() : users;
  return (
    <div className="directory">
      <h2 className="page-title">Directory</h2>
      <input
        type="text"
        className="search directory-search"
        placeholder="Search for user"
        onChange={(e) => {
          setUserInput(e.target.value);
          handleUserSearch();
        }}
      ></input>

      <div className="card-container">
        {displayedUsers.map((user) => (
          <UserCard
            firstName={user.first_name}
            lastName={user.last_name}
            role={user.role}
            userId={user.uid}
            image={user.headshot}
            imageSize="100"
          />
        ))}
      </div>
    </div>
  );
};

export default Directory;

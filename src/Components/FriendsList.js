import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function FriendsList() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:9000/api/friends`, {
          headers: {
            Authorization: token,
          },
        });
        setFriends(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="friends-container">
      <h1>Friends List.</h1>
      <ul className="friends-list">
        {friends.map((friend) => (
          <li className="friend" key={friend.id}>
            {friend.name} - {friend.age} - {friend.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default FriendsList;

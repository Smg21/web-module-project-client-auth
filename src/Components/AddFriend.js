import React, { useState } from "react";
import axios from "axios";

function AddFriend() {
  const [friend, setFriend] = useState({
    name: "",
    email: "",
    age: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFriend({ ...friend, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:9000/api/friends`, friend, {
        headers: {
          authorization: token,
        },
      });

      setFriend({
        name: "",
        email: "",
        age: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className="add-friend" onSubmit={onSubmit}>
        <h1>ADD FRIEND.</h1>
        <div>
          <label htmlFor="friendname">FRIEND NAME: </label>
          <br />
          <input
            onChange={handleChange}
            name="name"
            placeholder="Name Required.."
            value={friend.name}
          />
        </div>
        <div>
          <label htmlFor="friendemail">FRIEND EMAIL: </label>
          <br />
          <input
            onChange={handleChange}
            name="email"
            placeholder="Email Required.."
            value={friend.email}
          />
        </div>
        <div>
          <label htmlFor="friendage">FRIEND AGE: </label>
          <br />
          <input
            onChange={handleChange}
            name="age"
            placeholder="Age Required.."
            value={friend.age}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default AddFriend;

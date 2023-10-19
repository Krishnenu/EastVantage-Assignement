import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

type user = {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
};
// type props={
//   children:React.ReactNode;
// }
const App: React.FC = () => {
  const [userData, setUserData] = useState<user | null>(null);
  const fetchData = async () => {
    try {
      const res = await axios.get("https://randomuser.me/api");
      const user = {
        name: {
          firstName: res.data.results[0].name.first,
          lastName: res.data.results[0].name.last,
        },
        email: res.data.results[0].email,
      };
      setUserData(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.log("fetech unsuccessFul");
    }
  };

  useEffect(() => {
    const storage = localStorage.getItem("user");
    if (storage) {
      setUserData(JSON.parse(storage));
    } else {
      fetchData();
    }
  }, []);

  const btnClickHandler = () => {
    fetchData();
  };
  return (
    <div className="App">
      <div className="div-container">
        {userData ? (
          <div>
            <p className="heading-text">
              Name: {userData.name.firstName} {userData.name.lastName}
            </p>
            <p className="heading-text">Email: {userData.email}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className="btn-container">
          <button onClick={btnClickHandler} className="btn-refresh">
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;

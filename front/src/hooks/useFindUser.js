import { useState, useEffect } from "react";
import axios from "../helpers/axios";

export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function findUser() {
      const token = JSON.parse(localStorage.getItem("authToken"));
      if (token) setUser(JSON.parse(localStorage.getItem("authUser")));
      setLoading(false);
      // await axios
      //   .get("/auth/user")
      //   .then((res) => {
      //     console.log(res);

      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setLoading(false);
      //   });
    }
    findUser();
  }, []);

  return {
    user,
    setUser,
    isLoading,
  };
}

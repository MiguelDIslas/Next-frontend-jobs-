import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/auth/user");

      if (res.data.user) {
        setIsAuthenticated(true);
        setLoading(false);
        setUser(res.data.user);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      setError(
        err.response && (err.response.data.detail || err.response.data.error)
      );
    }
  };

  useEffect(() => {
    if (!user) loadUser();
  }, [user]);

  const login = async ({ username, password }) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/login", {
        username,
        password,
      });

      if (res.data.success) {
        await loadUser();
        setIsAuthenticated(true);
        setLoading(false);
        router.push("/");
      }
    } catch (err) {
      setLoading(false);
      setIsAuthenticated(false);
      setError(
        err.response && (err.response.data.detail || err.response.data.error)
      );
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");
      if (res.data.success) {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      setError(
        err.response && (err.response.data.detail || err.response.data.error)
      );
    }
  };

  const register = async ({ firstName, lastName, email, password }) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      if (res.data.success) {
        setLoading(false);
        await login({
          username: email,
          password: password,
        });
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response && (err.response.data.detail || err.response.data.error)
      );
    }
  };

  const update = async ({ firstName, lastName, email, password }) => {
    setLoading(true);
    try {
      const res = await axios.put("/api/auth/update", {
        firstName,
        lastName,
        email,
        password,
      });
      if (res.data.success) {
        setLoading(false);
        setUser(res.data.user);
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response && (err.response.data.detail || err.response.data.error)
      );
    }
  };

  const uploadResume = async (formData, access_token) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${process.env.API_URL}/upload/resume/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (res.data) {
        setLoading(false);
        setUser(res.data);
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response && (err.response.data.detail || err.response.data.error)
      );
    }
  };

  const clearErrors = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        error,
        isAuthenticated,
        login,
        logout,
        register,
        update,
        uploadResume,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

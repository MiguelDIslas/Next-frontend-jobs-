import { useState, createContext } from "react";
import axios from "axios";
const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [created, setCreated] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [applied, setApplied] = useState(false);
  const [stats, setStats] = useState(false);


  //Apply to job
  const applyToJob = async (id, access_token) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.API_URL}/jobs/${id}/apply/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (res.data.applied === true) {
        setLoading(false);
        setApplied(true);
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response && (err.response.data.detail || err.response.data.error)
      );
    }
  };

  //Check
  const checkJobApplied = async (id, access_token) => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.API_URL}/jobs/${id}/check/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      setLoading(false);
      setApplied(res.data);
    } catch (err) {
      setLoading(false);
      setError(
        err.response && (err.response.data.detail || err.response.data.error)
      );
    }
  };

  //Get Topic Stats
  const getTopicStats = async (topic) => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.API_URL}/stats/${topic}`);

      setLoading(false);
      setStats(res.data);
    } catch (err) {
      setLoading(false);
      setError(
        err.response && (err.response.data.detail || err.response.data.error)
      );
    }
  };

  //New Job
  const newJob = async (data, access_token) => {
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.API_URL}/jobs/new/`, data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (res.data) {
        setLoading(false);
        setCreated(true);
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response && (err.response.data.detail || err.response.data.error)
      );
    }
  };

  //Update Job
  const updateJob = async (id, data, access_token) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${process.env.API_URL}/jobs/${id}/update/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.data) {
        setLoading(false);
        setUpdated(true);
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response && (err.response.data.detail || err.response.data.error)
      );
    }
  };

  //Delete Job
  const deleteJob = async (id, access_token) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${process.env.API_URL}/jobs/${id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      setLoading(false);
      setDeleted(true);
    } catch (err) {
      setLoading(false);
      setError(
        err.response && (err.response.data.detail || err.response.data.error)
      );
    }
  };

  const clearErrors = () => setError(null);

  return (
    <JobContext.Provider
      value={{
        error,
        stats,
        loading,
        created,
        updated,
        deleted,
        applied,
        newJob,
        updateJob,
        deleteJob,
        setCreated,
        setUpdated,
        setDeleted,
        applyToJob,
        clearErrors,
        getTopicStats,
        checkJobApplied,
      }}
    >
      
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;

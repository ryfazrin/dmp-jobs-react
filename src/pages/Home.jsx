import React from 'react';
import { useNavigate } from 'react-router-dom';
import withAuth from '../helpers/withAuth';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/api/jobs?page=${currentPage}`, {
        headers: {
          'my-secret-key': token //the token is a variable which holds the token
        }
      });

      setJobs(response.data);
      console.log(response.data);
    }

    fetchData();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h1>Home</h1>
      {jobs.map(job => {
        if (!job) {
          return
        }

        return (
          <div key={job.id}>{job.company}</div>
        )
      })
      }
      <div>
        <button disabled={currentPage === 1} onClick={handlePrevPage}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button disabled={currentPage === 2} onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default withAuth(Home);

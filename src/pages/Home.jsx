import React from 'react';
import { useNavigate } from 'react-router-dom';
import withAuth from '../helpers/withAuth';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPages, setShowPages] = useState(true);

  // State for search
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [fullTime, setFullTime] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/api/jobs?page=${currentPage}`, {
        headers: {
          'my-secret-key': token //the token is a variable which holds the token
        }
      });

      setJobs(response.data);
    }

    fetchData();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // handle search
  const handleSearch = () => {
    const type = fullTime ? 'Full Time' : ''

    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/api/jobs?description=${description}&location=${location}&type=${type}`, {
        headers: {
          'my-secret-key': token //the token is a variable which holds the token
        }
      });

      setJobs(response.data);
    }

    fetchData();

    // if param null, get all data & show pages
    if (description == '' && location == '' && !fullTime) {
      setShowPages(true);
      return
    }

    setShowPages(false);
  };

  return (
    <div>
      <div>
        <h1>Search</h1>
        <label>
          Job Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label>
          <input type="checkbox" value={fullTime} onChange={(e) => setFullTime(e.target.value)} />
          full Time
        </label>
        <button onClick={handleSearch}>Search</button>
      </div>
      <h1>Home</h1>
      {jobs.map((job, i) => {
        if (!job) {
          return
        }

        return (
          <div key={job.id}>
            <Link to={'/jobs/' + job.id}>
              <b>{i}. {job.company}</b>
            </Link>
            <p>{job.location}</p>
          </div>
        )
      })
      }
      {showPages && (
        <div>
          <button disabled={currentPage === 1} onClick={handlePrevPage}>
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button disabled={currentPage === 2} onClick={handleNextPage}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default withAuth(Home);

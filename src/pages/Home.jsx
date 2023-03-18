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
      <div className='row'>
        <h2>Search</h2>
        <div className="col-3">
          <label className="form-label">Job Description</label>
          <input type="text" className="form-control" placeholder="Job Desc" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="col-3">
          <label className="form-label">Location</label>
          <input type="text" className="form-control" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div class="col-3 d-flex align-items-end">
          <div class="form-check">
          <input type="checkbox" className="form-check-input" value={fullTime} onClick={(e) => setFullTime(!fullTime)} />
              <label class="form-check-label" for="gridCheck">
                Full Time Only
              </label>
          </div>
        </div>
        <div className="col-3 d-flex align-items-end">
          <button onClick={handleSearch} className="btn btn-primary">Search</button>
        </div>
      </div>
      <h1>Home</h1>
      {jobs.map((job, i) => {
        if (!job) {
          return
        }

        return (
          <div key={job.id}>
            <Link to={'/jobs/' + job.id}>
              <b>{i}. {job.title}</b>
            </Link>
            <p>{job.company}</p>
            <p>{job.location}</p>
          </div>
        )
      })
      }
      {showPages && (
        <div class="btn-group">
          <button class="btn btn-primary" disabled={currentPage === 1} onClick={handlePrevPage}>
            Previous
          </button>
          <span class="btn btn-outline-primary">Page {currentPage}</span>
          <button class="btn btn-primary" disabled={currentPage === 2} onClick={handleNextPage}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default withAuth(Home);

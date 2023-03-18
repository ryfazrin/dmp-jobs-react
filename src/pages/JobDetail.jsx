import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
  const [job, setJob] = useState({})
  let { id } = useParams();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:5000/api/jobs/${id}`, {
        headers: {
          'my-secret-key': token //the token is a variable which holds the token
        }
      });

      setJob(response.data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Link to='/'>
          <b>Back Home</b>
        </Link>
      </div>
      <div>
        <span>{job.type}</span>/<span>{job.location}</span>
      </div>
      <p><b>{job.title}</b></p>

      <div dangerouslySetInnerHTML={{__html: job.description }} />
      <a href={job.company_url}>{job.company}</a>
      <img src={job.company_logo} />
    </div>
  )
}

export default JobDetail
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamPage from './TeamPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


function TeamList() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/teams')
      .then(response => {
        setTeams(response.data.teams);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  useEffect(()  => {
      axios.post('http://localhost:5000/load_players')
      .then(response => console.log('Players uploaded successfully:', response.data))
      .catch(error => console.error('Error uploading players:', error));
  }, []);
  useEffect(()  => {
    axios.post('http://localhost:5000/load_contracts')
    .then(response => console.log('Contracts uploaded successfully:', response.data))
    .catch(error => console.error('Error uploading Contracts:', error));
}, []);

  return (
    <div>
      <h1>Team List</h1>
      {teams.map(team => (
        <div key={team.TeamName}>
          <img src={team.Logo} style={{ height: '50px' }} alt="Logo image" />
          <div>
            <Link to={`/teams/${team.TeamName}`}>{team.TeamName}</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeamList />} />
        <Route path="/teams/:teamName" element={<TeamPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TeamPage() {
  const [teamDetails, setTeamDetails] = useState(null);
  const { teamName } = useParams(); // This hook extracts params from the route

  useEffect(() => {
    // Fetch specific team details from the Flask backend
    axios.get(`http://localhost:5000/teams/${teamName}`)
      .then(response => {
        setTeamDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching team details:', error);
      });
  }, [teamName]);


  if (!teamDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{teamDetails.TeamName}</h1>
      <img src={teamDetails.Logo} alt={`${teamDetails.TeamName} logo`} style={{ height: '100px' }} />
      <h3>Location: {teamDetails.TeamLocation}</h3>
      <h3>Owner: {teamDetails.TeamOwner}</h3>
      <h2>Players</h2>
      {teamDetails.Players.length > 0 ? (
        <ul>
          {teamDetails.Players.map((player, index) => (
            <li key={index}>
              <strong>{player.Name}</strong> - {player.Position}
              {player.Salary ? ` - $${player.Salary.toFixed(2)}` : ""}
            </li>
          ))}
        </ul>
      ) : (
        <p>No players listed for this team.</p>
      )}
    </div>
  );
}

export default TeamPage;

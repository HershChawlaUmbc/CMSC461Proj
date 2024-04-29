import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TeamPage() {
  const [teamDetails, setTeamDetails] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [salaryCapInfo, setSalaryCapInfo] = useState(null);
  const [newSalary, setNewSalary] = useState('');
  const [destinationTeam, setDestinationTeam] = useState('SomeTeam');
  const { teamName } = useParams();

  // Fetch team details
  const fetchTeamDetails = () => {
    axios.get(`http://localhost:5000/teams/${teamName}`)
      .then(response => {
        setTeamDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching team details:', error);
      });
  };

  // Fetch transaction data
  const fetchTransactions = () => {
    axios.get('http://localhost:5000/display_transactions')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  };
  // Drop player to Free Agency
  const dropToFreeAgency = (playerName) => {
    axios.post(`http://localhost:5000/${playerName}/drop_to_free_agency`)
      .then(response => {
        alert(`Player ${playerName} has been dropped to Free Agency.`);
        fetchTeamDetails(); // Refresh team details
        fetchTransactions(); // Refresh transactions
      })
      .catch(error => {
        console.error('Error dropping player to free agency:', error);
        alert('Failed to drop player to Free Agency.');
      });
  };

  // Handle player transfer
  const handlePlayerTransfer = (playerId) => {
    if (!newSalary || !destinationTeam) {
      alert('Please specify the destination team and new salary.');
      return;
    }

    axios.post(`http://localhost:5000/transfer_player/${playerId}/${destinationTeam}/${newSalary}`)
      .then(response => {
        alert(`Player has been transferred successfully to ${destinationTeam} with new salary $${newSalary}.`);
        fetchTeamDetails(); // Refresh team details
        fetchTransactions(); // Refresh transactions
      })
      .catch(error => {
        console.error('Error transferring player:', error);
        alert('Failed to transfer player.');
      });
  };

  // Fetch salary cap information
  const fetchSalaryCapInfo = () => {
    axios.get(`http://localhost:5000/${teamName}/display_salary_cap`)
      .then(response => {
        setSalaryCapInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching salary cap information:', error);
      });
  };

  useEffect(() => {
    fetchTeamDetails();
    fetchTransactions();
    fetchSalaryCapInfo();
  }, [teamName]);

  if (!teamDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{teamDetails.TeamName}</h1>
      <img src={teamDetails.Logo} alt={`${teamDetails.TeamName} logo`} style={{ height: '100px' }} />
  
      {/* Display Salary Cap Information at the top */}
      <div>
        <h3>Salary Cap Information</h3>
        {salaryCapInfo ? (
          <ul>
            <li>Total Salary: ${salaryCapInfo.total_salary.toFixed(2)}</li>
            <li>Salary Cap Limit: ${salaryCapInfo.salary_cap_limit.toFixed(2)}</li>
            <li>Under Salary Cap: {salaryCapInfo.under_salary_cap ? "Yes" : "No"}</li>
          </ul>
        ) : (
          <p>Salary cap information is currently unavailable.</p>
        )}
      </div>
  
      <h3>Location: {teamDetails.TeamLocation}</h3>
      <h3>Owner: {teamDetails.TeamOwner}</h3>
  
      <h2>Players</h2>
      {teamDetails.Players && teamDetails.Players.length > 0 ? (
        <ul>
          {teamDetails.Players.map((player, index) => (
            <li key={index}>
              <strong>{player.Name}</strong> - {player.Position}
              {player.Salary ? ` - $${player.Salary.toFixed(2)}` : ""}
              {teamName !== 'Free Agency' ? (
                <button onClick={() => dropToFreeAgency(player.Name)}>Drop to Free Agency</button>
              ) : (
                <div>
                  <button onClick={() => handlePlayerTransfer(player.PlayerID)}>Transfer Player</button>
                  <input type="text" placeholder="Enter new salary" value={newSalary} onChange={e => setNewSalary(e.target.value)} />
                  <input type="text" placeholder="Destination Team Name" value={destinationTeam} onChange={e => setDestinationTeam(e.target.value)} />
                </div>
              )}
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

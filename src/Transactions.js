import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/display_transactions')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              {transaction.PlayerName} - {transaction.TransactionType} - {transaction.TransactionDate}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions to display.</p>
      )}
    </div>
  );
}

export default Transactions;

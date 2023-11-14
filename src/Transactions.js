import React, { useState, useEffect } from 'react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTransaction, setSearchTransaction] = useState('');


  //fetch the data from the server and set it to state
  useEffect(() => {
    fetch('http://localhost:3000/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [transactions]);

  //function to handle search of the transactions by the description
  const handleSearch = event => {
    setSearchTransaction(event.target.value);
  };

  //function to delete a transaction from the server
  const handleDelete = (transactionIdToDelete) => {

    fetch(`http://localhost:3000/transactions/${transactionIdToDelete}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          //update the transactions state by filtering out the deleted transaction
          setTransactions(prevTransactions =>
            prevTransactions.filter(transaction => transaction.id !== transactionIdToDelete)
          );
        } else {
          console.error('Failed to delete transaction.');
        }
      })
  }
  
//function to filter through the transactions in regard to the description typed in the search bar
  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.includes(searchTransaction)
  );

  return (
    <div className="transactions">
      <h1>All Transactions</h1>
      <input
        type="text"
        placeholder="Search by description..."
        value={searchTransaction}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(transaction => (
            <tr key={transaction.id}>
            <td>{transaction.description}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.category}</td>
            <td>{transaction.date}</td>
            <td> 
            {/* Delete button to delete transaction  with transaction.id */}
               <button onClick ={() => handleDelete(transaction.id)}>
                Delete
              </button> 
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;

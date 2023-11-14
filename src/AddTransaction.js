import React, { useState } from 'react';

const AddTransaction = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date , setDate] = useState('')
  const [transactions , setTransactions] = useState([])

  const handleSubmit = event => {
    event.preventDefault();
    // Create a new transaction object with the form data
    const newTransaction = {
      description,
      amount,
      category,
      date,
    };


    // adding new transaction to server and adding it top state

    fetch("http://localhost:3000/transactions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newTransaction),
})
  .then(response => response.json())
  .then(data => setTransactions ([...transactions, newTransaction ]))
  .catch(error => console.error("Error adding transaction"));


    // Reset the form fields
    setDescription('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  return (
    <div className="add-transaction">
      <h1>Add New Transaction</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;

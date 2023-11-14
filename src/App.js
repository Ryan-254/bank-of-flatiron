import React from 'react';
import './App.css';
import Transactions from './Transactions';
import AddTransaction from './AddTransaction';

function App() {
  return (
      <div className="App">
        <h1>Bank Of Flatirion</h1>
        <Transactions transactions={Transactions} />
        <AddTransaction transactions={Transactions}  />
      </div>
  );
}

export default App;

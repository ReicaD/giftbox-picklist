import React from 'react';
import Dashboard from './components/Dashboard';

// Main App component - entry point for the warehouse pick list application
// This component simply renders the Dashboard which contains all the business logic
function App() {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App; 
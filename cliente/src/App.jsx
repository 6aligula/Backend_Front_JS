import React from 'react';
import './App.css';
import Homepage from "./Homepage";
import Authenticate from "./authenticate/Authenticate";
import { useUserContext } from './features/userContext'; 

function App() {
  const { user, isLoading } = useUserContext();
    
  return (
    <div className="app">
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : ( 
        <>{user ? <Homepage /> : <Authenticate />}</>
      )}
    </div>
  );
}

export default App;
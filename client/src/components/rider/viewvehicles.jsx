import React from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar'

export default function Viewvehicles() {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate('rider/addvehicle');  // Adjust this route to where you want to navigate
  }

  return (
    <>
      <Navbar />
      <h1>Vehicle Details</h1>

      {/* Floating Add Button */}
      <button 
        onClick={handleAddClick} 
        style={styles.floatingButton}
      >
        Add
      </button>
    </>
  )
}

const styles = {
  floatingButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: 'orange',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    fontSize: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  }
}

import React from 'react';
import Navbar from './navbar';

export default function Riderhome() {
  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.welcome}>Welcome back, Rider!</h1>

        <div style={styles.statsContainer}>
          <div style={styles.statsCard}>
            <h3>Total Rides</h3>
            <p>42</p> {/* Replace with dynamic data */}
          </div>
          <div style={styles.statsCard}>
            <h3>Total Earnings</h3>
            <p>$350</p> {/* Replace with dynamic data */}
          </div>
          <div style={styles.statsCard}>
            <h3>Kilometers Ridden</h3>
            <p>1200 km</p> {/* Replace with dynamic data */}
          </div>
        </div>

        <div style={styles.quickActions}>
          <button style={styles.quickActionButton}>View My Vehicles</button>
          <button style={styles.quickActionButton}>Start a Ride</button>
          <button style={styles.quickActionButton}>View Earnings</button>
          <button style={styles.quickActionButton}>Settings</button>
        </div>

        <div style={styles.news}>
          <h2>Latest Updates</h2>
          <div style={styles.newsCard}>
            <h3>New Rider Tips</h3>
            <p>Check out our latest blog post for tips to maximize your earnings!</p>
          </div>
          <div style={styles.newsCard}>
            <h3>Featured Destinations</h3>
            <p>Discover new and exciting places to ride to this weekend!</p>
          </div>
        </div>

        {/* <button style={styles.floatingButton}>+</button> */}
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  welcome: {
    textAlign: 'center',
    color: '#333',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
  statsCard: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '30%',
  },
  quickActions: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '30px',
  },
  quickActionButton: {
    backgroundColor: 'orange',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '16px',
    margin: '10px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  news: {
    marginTop: '30px',
  },
  newsCard: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
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
    fontSize: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  },
};

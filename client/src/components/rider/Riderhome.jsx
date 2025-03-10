import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';

export default function Riderhome() {
  const [record, setRecord] = useState({});
  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (!userId) return; // Ensure userId is present before making API call

    axios.get("http://localhost:9000/rider/viewtravel", { headers: { id: userId } })
      .then((res) => {
        setRecord(res.data);
        console.log(res.data); // You can remove this log in production
      })
      .catch((err) => {
        console.log(err);
        // Handle error gracefully, possibly show an error message in the UI
      });
  }, [userId]);

  // Safe parsing for totalKilometers
  let totalKilometers = 0;
  if (record.totalKilometers && typeof record.totalKilometers === 'string') {
    const kilometersString = record.totalKilometers.replace('km', '').trim(); // Remove 'km'
    const numbersArray = kilometersString.split(' ').map(num => parseFloat(num)).filter(num => !isNaN(num)); // Convert to numbers and filter out any NaN values
    totalKilometers = numbersArray.reduce((acc, currentValue) => acc + currentValue, 0);
  }

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.welcome}>Welcome back, Rider!</h1>

        <div style={styles.statsContainer}>
          <div style={styles.statsCard}>
            <h3>Total Rides</h3>
            <p>{record.totalRidesCount || 0}</p> {/* Fallback if data is missing */}
          </div>
          <div style={styles.statsCard}>
            <h3>Total Earnings</h3>
            <p>{record.totalEarnings || 0}</p> {/* Fallback if data is missing */}
          </div>
          <div style={styles.statsCard}>
            <h3>Kilometers Ridden</h3>
            <p>{totalKilometers} km</p> {/* Safely display total kilometers */}
          </div>
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

        {/* Dummy Riding Policies Section */}
        <div style={styles.policies}>
          <h2>Riding Policies</h2>
          <div style={styles.policyCard}>
            <h3>1. Safe Driving</h3>
            <p>Always wear a helmet and ensure that your vehicle is in good condition before starting the ride. Safety is the top priority.</p>
          </div>
          <div style={styles.policyCard}>
            <h3>2. Respect Traffic Laws</h3>
            <p>Follow all local traffic rules and regulations. Avoid speeding and always use signals when changing lanes or turning.</p>
          </div>
          <div style={styles.policyCard}>
            <h3>3. Customer Courtesy</h3>
            <p>Always greet the customer with respect and maintain a friendly attitude. Ensure that your vehicle is clean and comfortable.</p>
          </div>
          <div style={styles.policyCard}>
            <h3>4. Alcohol and Drugs</h3>
            <p>Riding under the influence of alcohol or drugs is strictly prohibited. It not only endangers your safety but also violates company policy.</p>
          </div>
          <div style={styles.policyCard}>
            <h3>5. Punctuality</h3>
            <p>Ensure that you arrive on time for all rides. If you are going to be late, inform the customer as early as possible.</p>
          </div>
        </div>

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
  policies: {
    marginTop: '40px',
  },
  policyCard: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
};

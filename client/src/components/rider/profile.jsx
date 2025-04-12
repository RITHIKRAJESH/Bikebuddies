import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Userhome from './navbar';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [rides, setRides] = useState([]);

  useEffect(() => {
     const url = import.meta.env.VITE_BASE_URL;
      console.log(url);
    const userid = localStorage.getItem("id");
    axios.get(`${url}/user/profile`, { headers: { id: userid } })
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user); // Set user details
        setRides(res.data.rides); // Set ride details
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Userhome />
      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <h1 className="text-center mb-4">Profile</h1>
          </Col>
        </Row>

        {/* User Details Card */}
        {user && (
          <Row className="mb-4">
            <Col md={12}>
              <Card className="mb-4 custom-card">
                <Card.Body>
                  <Card.Title>User Information</Card.Title>
                  <Card.Text>
                    <strong>Full Name:</strong> {user.fullname}
                  </Card.Text>
                  <Card.Text>
                    <strong>Email:</strong> {user.email}
                  </Card.Text>
                  <Card.Text>
                    <strong>Status:</strong> {user.verifieddriver ? 'Verified' : 'Not Verified'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Role:</strong> {user.role}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      <style jsx>{`
        /* Custom CSS for Profile Page */
        .custom-card {
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;
        }

        .custom-card:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .container {
          margin-top: 50px;
        }

        h1 {
          font-size: 2.5rem;
          font-weight: 600;
          color: #333;
        }

        .mb-4 {
          margin-bottom: 1.5rem;
        }

        .text-center {
          text-align: center;
        }

        .text-muted {
          color: #6c757d;
        }

        /* Card Text Custom Styling */
        .card-text {
          font-size: 1rem;
          color: #333;
          margin-bottom: 10px;
        }

        .card-body {
          padding: 1.5rem;
        }

        .btn-primary {
          background-color: #007bff;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
        }

        .btn-primary:hover {
          background-color: #0056b3;
        }
      `}</style>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import axios from 'axios';
import Sentiment from 'sentiment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

export default function ViewRating() {
  const userid = localStorage.getItem("id");
  const [reviews, setReviews] = useState([]);
  const [sentiments, setSentiments] = useState([]);

  useEffect(() => {
    // Fetch reviews from the server
    const url = import.meta.env.VITE_BASE_URL;
    console.log(url);
    axios.get(`${url}/rider/viewrating`, { headers: { id: userid } })
      .then((res) => {
        console.log(res.data);
        setReviews(res.data); // Store the fetched reviews
      }).catch((err) => {
        console.log(err);
      });
  }, [userid]);

  // Function to analyze sentiment of reviews
  const analyzeSentiment = (reviewText) => {
    const sentiment = new Sentiment();
    const result = sentiment.analyze(reviewText);
    return result.score; // positive or negative sentiment score
  };

  useEffect(() => {
    // Perform sentiment analysis once reviews are fetched
    if (reviews.length > 0) {
      const sentimentScores = reviews.map(review => analyzeSentiment(review.review)); // assuming `review` contains the review text
      setSentiments(sentimentScores); // Store sentiment scores
    }
  }, [reviews]);

  // Function to map sentiment score to sentiment label
  const getSentimentLabel = (score) => {
    if (score > 0) return "Positive";
    if (score < 0) return "Negative";
    return "Neutral";
  };

  return (
    <>
      <Navbar />
    <div className="container">
  <Typography variant="h3" gutterBottom textAlign={'center'}>
    Reviews && Ratings
  </Typography>

  {reviews.filter((r) => r.reviewstatus === "completed").length === 0? (
    <Typography variant="body1">No reviews available.</Typography>
  ) : (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Review</strong></TableCell>
            <TableCell>Rating</TableCell>
            <TableCell><strong>Response From Customer</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviews.map((review, index) => (
            <TableRow key={index}>
              <TableCell>{review.review}</TableCell>
              <TableCell>{review.rating} Star</TableCell>
              <TableCell>{getSentimentLabel(sentiments[index])}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )}
</div>

    </>
  );
}

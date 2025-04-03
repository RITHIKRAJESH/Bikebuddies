import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

export default function ViewRides() {
  const [stats, setStats] = useState({
    total: 0,
    booked: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const url = import.meta.env.VITE_BASE_URL;
    console.log(url);
    axios
      .get(`${url}/admin/viewrides`)
      .then((res) => {
        calculateStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const calculateStats = (data) => {
    setStats({
      total: data.length,
      booked: data.filter((ride) => ride.status === "Booked").length,
      confirmed: data.filter((ride) => ride.status === "Confirmed").length,
      completed: data.filter((ride) => ride.status === "Completed").length,
      cancelled: data.filter((ride) => ride.status === "Cancelled").length,
    });
  };

  // Data for Bar Chart
  const barData = [
    { name: "Booked", value: stats.booked },
    { name: "Confirmed", value: stats.confirmed },
    { name: "Completed", value: stats.completed },
    { name: "Cancelled", value: stats.cancelled },
  ];

  // Data for Pie Chart
  const pieData = barData.map((item) => ({ name: item.name, value: item.value }));
  const COLORS = ["#FF9800", "#4CAF50", "#9C27B0", "#D32F2F"];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Rides Statistical Report
      </Typography>

      <Grid container spacing={3}>
        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Ride Status Overview</Typography>
            <BarChart width={400} height={300} data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#2196F3" />
            </BarChart>
          </Paper>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Ride Status Distribution</Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

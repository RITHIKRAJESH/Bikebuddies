import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fab,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

export default function ViewVehicles() {
  const navigate = useNavigate();
  const [vehicles, setVehicle] = useState([]);

  useEffect(() => {
    const userid = localStorage.getItem("id");

    if (!userid) {
      console.log("No user ID found in localStorage");
      return;
    }

    axios
      .get("http://localhost:9000/rider/viewvehicle", { headers: { "_id": userid } })
      .then((res) => {
        setVehicle(res.data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const handleAddClick = () => {
    navigate("/rider/addvehicle");
  };

  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" gutterBottom align="center">
          Vehicle Details
        </Typography>

        {vehicles.length === 0 ? (
          <Typography variant="h6" align="center" color="textSecondary">
            No vehicles found.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {vehicles.map((vehicle) => (
              <Grid item xs={12} sm={6} md={4} key={vehicle._id}>
                <Card sx={{ boxShadow: 3 }}>
                  {vehicle.vehicleImage?.length > 0 && (
                    <CardMedia
                      component="img"
                      height="180"
                      image={`http://localhost:9000/${vehicle.vehicleImage[0]}`}
                      alt="Vehicle Image"
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6" color="primary">
                      {vehicle.vehicleName}
                    </Typography>
                    <Typography variant="body1">Model: {vehicle.model}</Typography>
                    <Typography variant="body1">Plate: {vehicle.regNo}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Location: {vehicle.place}
                    </Typography>

                    {/* Expandable Sections */}
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>RC Book Images</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {vehicle.rcBookImage?.length > 0 ? (
                          vehicle.rcBookImage.map((img, index) => (
                            <img
                              key={index}
                              src={`http://localhost:9000/${img}`}
                              alt="RC Book"
                              style={{ width: "100%", borderRadius: 8, marginBottom: 10 }}
                            />
                          ))
                        ) : (
                          <Typography>No RC Book images available</Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Insurance Image</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {vehicle.insuranceImage?.length > 0 ? (
                          <img
                            src={`http://localhost:9000/${vehicle.insuranceImage[0]}`}
                            alt="Insurance"
                            style={{ width: "100%", borderRadius: 8 }}
                          />
                        ) : (
                          <Typography>No insurance image available</Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>License Image</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {vehicle.licenseImage?.length > 0 ? (
                          <img
                            src={`http://localhost:9000/${vehicle.licenseImage[0]}`}
                            alt="License"
                            style={{ width: "100%", borderRadius: 8 }}
                          />
                        ) : (
                          <Typography>No license image available</Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Floating Add Button */}
      <button style={styles.floatingButton}>+</button>
     
    </>
  );
}

const styles={
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
  }
  
          }  
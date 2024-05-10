import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./LaunchesPages.css"

const LaunchDetailPage = () => {
  const { flightNumber } = useParams();
  const [launch, setLaunch] = useState(null);

  useEffect(() => {
    fetchLaunchDetails();
  }, [flightNumber]);

  const fetchLaunchDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.spacexdata.com/v3/launches/${flightNumber}`
      );
      setLaunch(response.data);
    } catch (error) {
      console.error("Error fetching launch details:", error);
    }
  };

  if (!launch) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{launch.mission_name}</h2>
      <p>Flight Number: {launch.flight_number}</p>
      <p>Launch Date: {launch.launch_date_local}</p>
      <p>Details: {launch.details}</p>
      <img
        src={launch.links.mission_patch}
        alt={launch.mission_name}
        style={{ height: "500px", width: "500px" }}
      />
    </div>
  );
};

export default LaunchDetailPage;

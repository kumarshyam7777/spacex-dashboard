import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


import axios from "axios";

const LaunchesPage = () => {
  const history = useHistory();
  const [launches, setLaunches] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleLaunchClick = (flightNumber) => {
    history.push(`/launch/${flightNumber}`);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchLaunches = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.spacexdata.com/v3/launches?limit=10&offset=${
          (page - 1) * 10
        }`
      );
      setLaunches((prevLaunches) => [...prevLaunches, ...response.data]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching launches:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLaunches();
  }, [fetchLaunches, page]);



  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div class="launch-page">
      {launches.map((launch) => (
        <div
          key={launch.flight_number}
          onClick={() => handleLaunchClick(launch.flight_number)}
        >
          <h3>{launch.mission_name}</h3>
          <p>Launch Date: {launch.launch_date_local}</p>
          <p>Flight Number: {launch.flight_number}</p>
          <p style={{ fontSize: "20px" }}>Details: {launch.details}</p>
          <img
            src={launch.links.mission_patch_small}
            alt={launch.mission_name}
          />
        </div>
      ))}
    </div>

    //   <Container>
    //   <Row>
    //     {launches.map((launch) => (
    //       <Col key={launch.flight_number} xs={12} md={6} lg={4}>
    //         <LaunchCard launch={launch} onClick={() => handleLaunchClick(launch.flight_number)} />
    //       </Col>
    //     ))}
    //   </Row>
    // </Container>
  );
};

export default LaunchesPage;

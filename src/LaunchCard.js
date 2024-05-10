import React from "react";
import { Card } from "react-bootstrap";

const LaunchCard = ({ launch, onClick }) => {
  return (
    <Card className="my-3" style={{ width: "16rem" }} onClick={onClick}>
      <Card.Img variant="top" src={launch.links.mission_patch_small} />
      <Card.Body>
        <Card.Title>{launch.mission_name}</Card.Title>
        <Card.Text>
          <strong>Flight Number:</strong> {launch.flight_number}
          <br />
          <strong>Launch Date:</strong> {launch.launch_date_local}
          <br />
          <strong>Details:</strong> {launch.details}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default LaunchCard;

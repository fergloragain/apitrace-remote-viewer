import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Card, Container, Grid, Loader } from "semantic-ui-react";
import { getApplications } from "../services/api";

function ListApplications({ history }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApplications().then(applications => {
      if (!applications.length) {
        return history.push("/add");
      }
      setApplications(applications);
      setLoading(false);
    });
  }, [history]);

  function renderAppCard(application) {
    return (
      <Grid.Column key={application.id}>
        <Card as={Link} to={`/app/${application.id}`}>
          <Card.Content>
            <Card.Header>{application.name}</Card.Header>
            <Card.Meta>
              <span className="date">{application.branch}</span>
            </Card.Meta>
            <Card.Description>{application.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>{application.traces} traces</Card.Content>
        </Card>
      </Grid.Column>
    );
  }

  function gatherColumns() {
    return applications.reduce((acc, app, i) => {
      const activeRow = Math.floor(i / 3);
      if (!acc[activeRow]) {
        acc[activeRow] = [renderAppCard(app)];
      } else {
        acc[activeRow].push(renderAppCard(app));
      }
      return acc;
    }, []);
  }

  function renderRows() {
    return gatherColumns().map((row, i) => {
      return <Grid.Row key={i}>{row}</Grid.Row>;
    });
  }

  if (loading) {
    return <Loader active />;
  }

  return (
    <Container>
      <Grid columns="3">{renderRows()}</Grid>
    </Container>
  );
}

export default withRouter(ListApplications);

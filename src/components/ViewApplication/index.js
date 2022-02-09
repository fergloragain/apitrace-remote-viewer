import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  List,
  Header,
  Container,
  Grid,
  Loader
} from "semantic-ui-react";
import {
  addApplication,
  addTrace,
  deleteTrace,
  getApplication
} from "../../services/api";

function ViewApplication({ history, match }) {
  const [app, setApp] = useState({});
  const [loading, setLoading] = useState(true);

  const { appID } = match.params;

  useEffect(() => {
    getApplication(appID).then(app => {
      setApp(app);
      setLoading(false);
    });
  }, [appID]);

  function handleTrace() {
    addTrace(app.id).then(res => {
      setApp({
        ...app,
        traces: [...app.traces, res.id]
      });
    });
  }

  function handleDuplicate() {
    addApplication(app).then(() => {
      history.push("/");
    });
  }

  function handleDelete(trace) {
    deleteTrace(trace)
      .then(() => getApplication(app.id))
      .then(setApp);
  }

  if (loading) {
    return <Loader active />;
  }

  return (
    <Container
      style={{
        marginTop: "3em",
        marginBottom: "3em",
        width: "50%"
      }}
    >
      <Header as="h1">{app.name}</Header>
      <p>{app.description}</p>

      <Grid columns={2} style={{ marginBottom: "2em" }}>
        <Grid.Column>
          <Header as="h4">URL</Header>
          <p>{app.url}</p>
        </Grid.Column>
        <Grid.Column>
          <Header as="h4">Branch</Header>
          <p>{app.branch}</p>
        </Grid.Column>
      </Grid>

      <Form style={{ marginBottom: "2em" }}>
        <Button onClick={handleTrace} primary>
          Trace
        </Button>

        <Button onClick={handleDuplicate} basic floated="right">
          Duplicate
        </Button>
        <Button as={Link} to={`/edit/${app.id}`} basic floated="right">
          Edit
        </Button>
      </Form>
      <Header as="h1">Traces</Header>
      <p>The following is a list of traces recorded for this application</p>
      <List relaxed="very">
        {app.traces.map(trace => (
          <List.Item key={trace}>
            <Button
              negative
              basic
              floated="right"
              onClick={() => handleDelete(trace)}
            >
              Delete
            </Button>
            <Link to={`/trace/${trace}/0`}>
              <List.Header>{trace}</List.Header>
              <List.Description>{app.description}</List.Description>
            </Link>
          </List.Item>
        ))}
      </List>
    </Container>
  );
}

export default ViewApplication;

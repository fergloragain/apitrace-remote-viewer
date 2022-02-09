import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Header,
  List,
  Container,
  Button,
  Grid,
  Loader,
  Segment
} from "semantic-ui-react";
import { getTrace, getDump } from "../services/api";

function ViewTrace({ match }) {
  const [traceDetails, setTraceDetails] = useState({
    calls: [],
    traceOutput: {}
  });
  const [loading, setLoading] = useState(true);
  const { appID, frameID } = match.params;
  useEffect(() => {
    getTrace(appID).then(trace => {
      getDump(appID, frameID).then(dump => {
        setTraceDetails({
          ...trace,
          calls: dump.calls
        });
        setLoading(false);
      });
    });
  }, [appID, frameID]);

  function renderItem(item) {
    return (
      <List.Item key={item.id}>
        <Link to={`/dump/${appID}/${item.id}`}>
          <List.Description>
            <b>{item.functionName} </b>({item.pv}){item.returnValue}
          </List.Description>
        </Link>
      </List.Item>
    );
  }

  function renderListItems() {
    return (
      traceDetails.calls &&
      traceDetails.calls
        .reduce((acc, call) => {
          const item = { ...call };
          item.pv = call.paramNames
            .map((paramName, i) => {
              return `${paramName} = ${call.paramValues[i]}`;
            })
            .join(", ");

          return [...acc, item];
        }, [])
        .map(renderItem)
    );
  }

  return (
    <Container
      style={{
        marginTop: "3em",
        marginBottom: "3em",
        width: "50%"
      }}
    >
      <Header as="h1">{appID}</Header>
      <Header as="h2">stdout</Header>
      <Segment
        style={{ whiteSpace: "pre-wrap", overflow: "auto", maxHeight: 200 }}
        color="yellow"
      >
        {traceDetails.traceOutput.stdOut}
      </Segment>
      <Header as="h2">stderr</Header>
      <Segment
        style={{ whiteSpace: "pre-wrap", overflow: "auto", maxHeight: 200 }}
        color="orange"
      >
        {traceDetails.traceOutput.stdErr}
      </Segment>
      <Header as="h2">Calls</Header>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Button
              disabled={frameID <= 0}
              as={Link}
              to={`/trace/${appID}/${+frameID - 1}`}
            >
              Previous
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Header textAlign="center" as="h2">
              Frame {frameID} of{" "}
              {loading ? "-" : traceDetails.numberOfFrames - 1}
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Button
              floated="right"
              disabled={frameID >= traceDetails.numberOfFrames - 1}
              as={Link}
              to={`/trace/${appID}/${+frameID + 1}`}
            >
              Next
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <List divided relaxed="very">
        {loading && <Loader active />}
        {renderListItems()}
      </List>
    </Container>
  );
}

export default ViewTrace;

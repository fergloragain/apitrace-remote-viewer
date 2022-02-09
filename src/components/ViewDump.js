import React, { useEffect, useState } from "react";
import JSONTree from "react-json-tree";
import {
  Header,
  Container,
  Segment,
  Grid,
  Loader,
  Image,
  Divider
} from "semantic-ui-react";
import { getRetrace, addRetrace } from "../services/api";

function ViewDump({ match }) {
  const [activeRetrace, setRetrace] = useState({});
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(true);
  const { appID, callID } = match.params;

  useEffect(() => {
    getRetrace(appID, callID).then(retrace => {
      if (retrace.length === 0) {
        return addRetrace(appID, callID).then(() => {
          setPending(true);
          setLoading(false);
        });
      }
      setRetrace(retrace);
      setLoading(false);
    });
  }, [appID, callID]);

  if (loading) {
    return <Loader active />;
  }

  if (pending) {
    return (
      <Container
        style={{
          marginTop: "3em",
          marginBottom: "3em",
          width: "50%"
        }}
      >
        <Header as="h1">Pending, come back later...</Header>
      </Container>
    );
  }

  console.log(activeRetrace);

  return (
    <Container
      style={{
        marginTop: "3em",
        marginBottom: "3em",
        width: "50%"
      }}
    >
      <Header as="h1">
        Call {callID} of {appID}
      </Header>
      <Divider section />
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Image
              bordered
              src={`http://localhost:8080/images/${appID}/${
                activeRetrace.imageSet.callID
              }-${activeRetrace.imageSet.mrt[0]}.${
                activeRetrace.imageSet.type
              }`}
              size="medium"
            />
            <Header as="h3" textAlign="center">
              MRT 0
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Image
              bordered
              src={`http://localhost:8080/images/${appID}/${
                activeRetrace.imageSet.callID
              }-${activeRetrace.imageSet.depth}.${activeRetrace.imageSet.type}`}
              size="medium"
            />
            <Header as="h3" textAlign="center">
              Depth
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Image
              bordered
              src={`http://localhost:8080/images/${appID}/${
                activeRetrace.imageSet.callID
              }-${activeRetrace.imageSet.stencil}.${
                activeRetrace.imageSet.type
              }`}
              size="medium"
            />
            <Header as="h3" textAlign="center">
              Stencil
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Header as="h2">Parameters</Header>
      <Segment>
        <JSONTree
          data={activeRetrace.retraceData.parameters}
          theme="tomorrow"
          hideRoot={true}
        />
      </Segment>
      <Header as="h2">Shaders</Header>
      <Segment>
        <JSONTree
          data={activeRetrace.retraceData.shaders}
          theme="tomorrow"
          hideRoot={true}
        />
      </Segment>
      <Header as="h2">Buffers</Header>
      <Segment>
        <JSONTree
          data={activeRetrace.retraceData.buffers}
          theme="tomorrow"
          hideRoot={true}
        />
      </Segment>
      <Header as="h2">Framebuffer</Header>
      <Segment>
        <JSONTree
          data={activeRetrace.retraceData.framebuffer}
          theme="tomorrow"
          hideRoot={true}
        />
      </Segment>
      <Header as="h2">Shader storage buffer blocks</Header>
      <Segment>
        <JSONTree
          data={activeRetrace.retraceData.shaderstoragebufferblocks}
          theme="tomorrow"
          hideRoot={true}
        />
      </Segment>
      <Header as="h2">Textures</Header>
      <Segment>
        <JSONTree
          data={activeRetrace.retraceData.textures}
          theme="tomorrow"
          hideRoot={true}
        />
      </Segment>
      <Header as="h2">Uniforms</Header>
      <Segment>
        <JSONTree
          data={activeRetrace.retraceData.uniforms}
          theme="tomorrow"
          hideRoot={true}
        />
      </Segment>
    </Container>
  );
}

export default ViewDump;

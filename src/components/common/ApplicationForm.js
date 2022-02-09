import React from "react";
import { Form, Header, Container } from "semantic-ui-react";

const { Checkbox, Input } = Form;

function ApplicationForm({
  footer,
  formTitle,
  formDescription,
  onFormChange,
  formValues
}) {
  return (
    <Container
      style={{
        marginTop: "3em",
        marginBottom: "3em",
        width: "50%"
      }}
    >
      <Header as="h1">{formTitle}</Header>
      <p>{formDescription}</p>
      <Form>
        <Input
          label="Name"
          placeholder="my cool app"
          onChange={onFormChange("name")}
          value={formValues.name}
        />
        <Input
          label="Description"
          placeholder="a really cool app that i want to trace remotely"
          onChange={onFormChange("description")}
          value={formValues.description}
        />
        <Input
          label="URL"
          placeholder="me@myserver.com:~/git/myrepo"
          onChange={onFormChange("url")}
          value={formValues.url}
        />
        <Input
          label="User"
          placeholder="joebloggs"
          onChange={onFormChange("user")}
          value={formValues.user}
        />
        <Input
          label="Private key"
          placeholder="/home/joebloggs/.ssh/id_rsa"
          onChange={onFormChange("privateKey")}
          value={formValues.privateKey}
        />
        <Input
          label="Branch"
          placeholder="master"
          onChange={onFormChange("branch")}
          value={formValues.branch}
        />
        <Input
          label="Build script"
          placeholder="build.sh"
          onChange={onFormChange("buildScript")}
          value={formValues.buildScript}
        />
        <Input
          label="Executable"
          placeholder="myapp"
          onChange={onFormChange("executable")}
          value={formValues.executable}
        />
        <Input
          label="Timeout"
          placeholder="10"
          onChange={onFormChange("timeout")}
          value={formValues.timeout}
        />
        <Input
          label="apitrace location"
          placeholder="/usr/bin/apitrace"
          onChange={onFormChange("apiTrace")}
          value={formValues.apiTrace}
        />
        <Input
          label="glretrace location"
          placeholder="/usr/bin/glretrace"
          onChange={onFormChange("retrace")}
          value={formValues.retrace}
        />
        <Checkbox
          label="Dump images"
          onChange={onFormChange("dumpImages")}
          checked={formValues.dumpImages}
        />
        {footer}
      </Form>
    </Container>
  );
}

export default ApplicationForm;

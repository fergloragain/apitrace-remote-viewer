import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { ApplicationForm } from "./common";
import { addApplication } from "../services/api";

function AddApplication({ history }) {
  const [formValues, setFormValue] = useState({
    name: "",
    description: "",
    url: "",
    user: "",
    privateKey: "",
    branch: "",
    buildScript: "",
    executable: "",
    timeout: 2,
    apiTrace: "",
    retrace: "",
    applications: [],
    dumpImages: true,
    redirect: false
  });

  const onFormChange = key => e =>
    setFormValue({
      ...formValues,
      [key]: e.target.value
    });

  const submitForm = () => {
    addApplication(formValues).then(app => {
      history.push(`/app/${app.id}`);
    });
  };

  const Footer = () => (
    <>
      <Button primary onClick={submitForm}>
        Add
      </Button>
      <Button as={Link} to={`/`} basic floated="right">
        Cancel
      </Button>
    </>
  );

  return (
    <ApplicationForm
      formTitle="Add application"
      formDescription="Add an application here that you want to trace remotely. Please specify absolute filepaths only."
      onFormChange={onFormChange}
      formValues={formValues}
      footer={<Footer />}
    />
  );
}

export default AddApplication;

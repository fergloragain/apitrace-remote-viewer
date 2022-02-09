import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Loader } from "semantic-ui-react";
import { ApplicationForm } from "./common";
import {
  deleteApplication,
  updateApplication,
  getApplication
} from "../services/api";

function EditApplication({ history, match }) {
  const [formValues, setFormValue] = useState({});
  const [loading, setLoading] = useState(true);

  const { appID } = match.params;

  useEffect(() => {
    getApplication(appID).then(app => {
      setFormValue(app);
      setLoading(false);
    });
  }, [appID]);

  const onFormChange = key => e =>
    setFormValue({
      ...formValues,
      [key]: e.target.value
    });

  const submitForm = () => {
    updateApplication(formValues).then(() => {
      history.push(`/app/${appID}`);
    });
  };

  const deleteApp = () => {
    deleteApplication(appID).then(() => {
      history.push("/");
    });
  };

  const Footer = () => (
    <>
      <Button primary onClick={submitForm}>
        Update
      </Button>
      <Button as={Link} to={`/app/`} basic floated="right">
        Cancel
      </Button>
      <Button basic negative onClick={deleteApp} floated="right">
        Delete
      </Button>
    </>
  );

  if (loading) {
    return <Loader active />;
  }

  return (
    <ApplicationForm
      formTitle="Edit application"
      formDescription="Edit an application here that you want to trace remotely. Please specify absolute filepaths only."
      onFormChange={onFormChange}
      formValues={formValues}
      footer={<Footer />}
    />
  );
}

export default EditApplication;

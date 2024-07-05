import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";

const NewProjectButton = ({ onCreateNewProject }) => {
  const [modal, setModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [programmingLanguage, setProgrammingLanguage] = useState("");
  const [details, setDetails] = useState("");

  const toggle = () => setModal(!modal);

  const handleCreateProject = () => {
    onCreateNewProject({ projectName, programmingLanguage, details });
    setProjectName(""); // Clear the state variables after creating the project
    setProgrammingLanguage("");
    setDetails("");
    setModal(false); // Close the modal after creating the project
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>Create New Project</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create New Project</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="projectName">Project Name</Label>
              <Input type="text" id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="programmingLanguage">Programming Language</Label>
              <Input type="text" id="programmingLanguage" value={programmingLanguage} onChange={(e) => setProgrammingLanguage(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="details">Details</Label>
              <Input type="textarea" id="details" value={details} onChange={(e) => setDetails(e.target.value)} />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCreateProject}>Create Project</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default NewProjectButton;

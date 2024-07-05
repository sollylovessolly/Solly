import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, ListGroup, ListGroupItem, Table } from "reactstrap";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [modal, setModal] = useState(false);
    const [logModal, setLogModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [logs, setLogs] = useState([]);
    const [errors, setErrors] = useState([]);
    const [newProject, setNewProject] = useState({
        projectName: "",
        programmingLanguage: "",
        collaborators: [],
        logsCount: 0 // This will be fetched from the backend
    });
    const [collaborator, setCollaborator] = useState("");

    // Demo values
    useEffect(() => {
        const demoProjects = [
            {
                projectName: "Project Alpha",
                programmingLanguage: "JavaScript",
                collaborators: ["Alice", "Bob"],
                logsCount: 5
            },
            {
                projectName: "Project Beta",
                programmingLanguage: "Python",
                collaborators: ["Charlie", "David"],
                logsCount: 3
            }
        ];
        setProjects(demoProjects);
    }, []);

    const toggle = () => {
        setModal(!modal);
        if (!modal) {
            // Clear the form when opening the modal
            setNewProject({
                projectName: "",
                programmingLanguage: "",
                collaborators: [],
                logsCount: 0
            });
            setCollaborator("");
        }
    };

    const toggleLogModal = (project) => {
        setSelectedProject(project);
        setLogModal(!logModal);
        if (!logModal && project) {
            // Demo logs for the selected project
            const demoLogs = [
                { timestamp: "2024-06-12T14:00:00Z", count: 10 },
                { timestamp: "2024-06-12T13:00:00Z", count: 5 },
                { timestamp: "2024-06-12T12:00:00Z", count: 2 }
            ];
            setLogs(demoLogs);
        }
    };

    const toggleErrorModal = (log) => {
        setErrorModal(!errorModal);
        if (!errorModal && log) {
            // Demo errors for the selected log
            const demoErrors = [
                { message: "TypeError: Cannot read property 'foo' of undefined" },
                { message: "ReferenceError: bar is not defined" },
                { message: "SyntaxError: Unexpected token <" }
            ];
            setErrors(demoErrors);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if(value){
            setNewProject({ ...newProject, [name]: value });
        }
        
    };

    const handleAddCollaborator = () => {
        if (collaborator && !newProject.collaborators.includes(collaborator)) {
            setNewProject({
                ...newProject,
                collaborators: [...newProject.collaborators, collaborator]
            });
        }
        setCollaborator("");
    };

    const handleCreateProject = () => {
        setProjects([...projects, newProject]);

        toggle();
    };

    const styles = {
        container: {
            padding: '20px',
            backgroundColor: '#e0f7fa',
            minHeight: '100vh'
        },
        header: {
            marginBottom: '20px',
            color: '#006064'
        },
        card: {
            marginBottom: '3rem',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'transform 0.2s'
        },
        cardHeader: {
            backgroundColor: '#00acc1',
            color: '#ffffff'
        },
        cardBody: {
            color: '#006064'
        },
        button: {
            backgroundColor: '#00acc1',
            borderColor: '#00acc1'
        },
        logTable: {
            width: '100%',
            marginBottom: '1rem',
            color: '#212529',
            backgroundColor: '#fff',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
        },
        logTableRow: {
            ':hover': {
                backgroundColor: '#f5f5f5'
            }
        },
        errorTable: {
            width: '100%',
            marginBottom: '1rem',
            color: '#ff6347',
            backgroundColor: '#1c1c1c'
        },
        errorModal: {
            backgroundColor: '#000',
            color: '#ff6347',
            padding: '1rem',
            borderRadius: '5px',
            width: '80%',
            margin: 'auto'
        },
        modalContent: {
            width: '80%',
            margin: 'auto'
        }
    };

    return (
        <Container fluid style={styles.container}>
            <Row style={{ marginBottom: '1.5rem' }}>
                <Col>
                    <Button style={styles.button} onClick={toggle}>Create New Project</Button>
                </Col>
            </Row>
            <Row>
                {projects.map((project, index) => (
                    <Col key={index} xl="4" style={{ ...styles.card, ':hover': { transform: 'scale(1.05)' } }} onClick={() => toggleLogModal(project)}>
                        <Card className="shadow">
                            <CardHeader className="border-0" style={styles.cardHeader}>
                                <h3 className="mb-0">{project.projectName}</h3>
                            </CardHeader>
                            <CardBody style={styles.cardBody}>
                                <p>Programming Language: {project.programmingLanguage}</p>
                                {project.collaborators.length > 0 && (
                                    <p>Collaborators: {project.collaborators.join(', ')}</p>
                                )}
                                <p>Logs Count: {project.logsCount}</p>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create New Project</ModalHeader>
                <ModalBody style={styles.modalContent}>
                    <Form>
                        <FormGroup>
                            <Label for="projectName">Project Name</Label>
                            <Input
                                type="text"
                                name="projectName"
                                id="projectName"
                                value={newProject.projectName}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="programmingLanguage">Programming Language</Label>
                            <Input
                                type="text"
                                name="programmingLanguage"
                                id="programmingLanguage"
                                value={newProject.programmingLanguage}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="collaborator">Add Collaborator</Label>
                            <Input
                                type="text"
                                name="                                collaborator"
                                id="collaborator"
                                value={collaborator}
                                onChange={(e) => setCollaborator(e.target.value)}
                            />
                            <Button style={{ ...styles.button, marginTop: '10px' }} onClick={handleAddCollaborator}>
                                Add Collaborator
                            </Button>
                        </FormGroup>
                        <FormGroup>
                            <Label>Collaborators</Label>
                            <ListGroup>
                                {newProject.collaborators.map((collab, index) => (
                                    <ListGroupItem key={index}>{collab}</ListGroupItem>
                                ))}
                            </ListGroup>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button style={styles.button} onClick={handleCreateProject}>Create Project</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={logModal} toggle={() => toggleLogModal(null)} size="lg">
                <ModalHeader toggle={() => toggleLogModal(null)}>Logs for {selectedProject?.projectName}</ModalHeader>
                <ModalBody style={styles.modalContent}>
                    <Table style={styles.logTable}>
                        <thead>
                            <tr>
                                <th>Time Stamp</th>
                                <th>Number of Logs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log, index) => (
                                <tr key={index} style={styles.logTableRow} onClick={() => toggleErrorModal(log)}>
                                    <td>{log.timestamp}</td>
                                    <td>{log.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => toggleLogModal(null)}>Close</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={errorModal} toggle={toggleErrorModal} size="lg">
                <ModalHeader toggle={toggleErrorModal}>Errors</ModalHeader>
                <ModalBody style={styles.errorModal}>
                    <h5>Error Details</h5>
                    <hr />
                    {errors.map((error, index) => (
                        <div key={index}>
                            <p>Error {index + 1}:</p>
                            <code>{error.message}</code>
                        </div>
                    ))}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleErrorModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
};

export default Projects;


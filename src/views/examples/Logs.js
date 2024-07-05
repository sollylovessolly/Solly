import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table } from 'reactstrap';

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [logModal, setLogModal] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);
    const [dummyData,setDummydata] = useState({});
    useEffect(() => {
        const exampleLogs = [
            { projectName: 'Project A', time: '2024-06-12T08:00:00Z', status: 'Handled' },
            { projectName: 'Project B', time: '2024-06-12T09:30:00Z', status: 'Unhandled' },
            { projectName: 'Project C', time: '2024-06-12T10:45:00Z', status: 'Handled' }
        ];
        setLogs(exampleLogs);
    }, []);

    const handleRowClick = (log) => {
        setSelectedLog(log);
        setLogModal(true);
        fetch("https://reqres.in/api/users?page=2", {

        }).then((response)=>{
            console.log("accepted", response)
            console.log(response.status)
            return response.json()
           

        }).then(data =>{
            const fetchedData = data.data[0];
            console.log(fetchedData.first_name);
            setDummydata(fetchedData);
        }).catch((error)=>{
            console.log("rejected", error)
        })
    };

    const toggleLogModal = () => {
        setLogModal(!logModal);
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
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        },
        th: {
            padding: '10px',
            backgroundColor: '#00acc1',
            color: '#ffffff',
            textAlign: 'left'
        },
        td: {
            padding: '10px',
            color: '#006064',
            cursor: 'pointer',
            borderBottom: 'none'
        },
        tr: {
            transition: 'background-color 0.3s',
        },
        trHover: {
            backgroundColor: '#b2ebf2'
        },
        modalContent: {
            backgroundColor: '#000',
            color: '#ff6347',
            padding: '1rem',
            borderRadius: '5px'
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>App Logs</h1>
            <Table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Project Name</th>
                        <th style={styles.th}>Time</th>
                        <th style={styles.th}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr
                            key={index}
                            style={styles.tr}
                            onClick={() => handleRowClick(log)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <td style={styles.td}>{log.projectName}</td>
                            <td style={styles.td}>{new Date(log.time).toLocaleString()}</td>
                            <td style={styles.td}>{log.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal isOpen={logModal} toggle={toggleLogModal}>
                <ModalHeader toggle={toggleLogModal}>Log Details</ModalHeader>
                <ModalBody style={styles.modalContent}>
                    {selectedLog && (
                        <div>
                            <p><strong>Project Name:</strong> {dummyData.first_name}</p>
                            <p><strong>Time:</strong> {dummyData.id}</p>
                            <p><strong>Status:</strong> {dummyData.email}</p>
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleLogModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Logs;

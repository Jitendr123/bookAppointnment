import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Container, Row, Table } from 'react-bootstrap'
import PatientInfo from './PatientInfo';

function AllAppointments() {
    const [scrMode, setScrMode] = useState('VIEWLIST');
    const list = [
        { id: 1, name: 'jitendra', mobile: '8741862238', age: 28, disease: '2 weeks contineously khasi', address: 'muhalla athaipura ranipur jhansi', status: 'P' },
        { id: 2, name: 'jitendra', mobile: '8741862238', age: 28, disease: '2 weeks contineously khasi', address: 'muhalla athaipura ranipur jhansi', status: 'P' },
        { id: 3, name: 'jitendra', mobile: '8741862238', age: 28, disease: '2 weeks contineously khasi', address: 'muhalla athaipura ranipur jhansi', status: 'P' },
        { id: 4, name: 'jitendra', mobile: '8741862238', age: 28, disease: '2 weeks contineously khasi', address: 'muhalla athaipura ranipur jhansi', status: 'P' },
        { id: 5, name: 'jitendra', mobile: '8741862238', age: 28, disease: '2 weeks contineously khasi', address: 'muhalla athaipura ranipur jhansi', status: 'P' },
        { id: 6, name: 'jitendra', mobile: '8741862238', age: 28, disease: '2 weeks contineously khasi', address: 'muhalla athaipura ranipur jhansi', status: 'P' },
        { id: 7, name: 'jitendra', mobile: '8741862238', age: 28, disease: '2 weeks contineously khasi', address: 'muhalla athaipura ranipur jhansi', status: 'P' },
        { id: 8, name: 'jitendra', mobile: '8741862238', age: 28, disease: '2 weeks contineously khasi', address: 'muhalla athaipura ranipur jhansi', status: 'A' },
    ]

    function statusHandler(data, status) {
    }
    function showPatientHandler(data) {
        setScrMode('VIEWPATIENT')
    }
    return (
        <Container>
            <Row className='webView docbg docMain'>
                {scrMode === 'VIEWLIST' && <>
                    <h4 className='borderBottom' style={{ textAlign: 'left' }}>All Appointments</h4>
                    <Table responsive striped bordered>
                        <thead>
                            <tr>
                                <th> Srno </th>
                                <th>Name</th>
                                {/* <th>Mobile No</th> */}
                                <th>Age</th>
                                <th>Disease</th>
                                {/* <th>Address</th> */}
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((data, index) => (
                                <tr key={data.id}>
                                    <td>
                                        <span style={{ color: "blue", cursor: "pointer", marginRight: '1rem' }} onClick={() => showPatientHandler(data)}>
                                            <FontAwesomeIcon icon={faEye} />
                                        </span>
                                        <span>
                                            {index + 1}
                                        </span>
                                    </td>
                                    <td>{data.name}</td>
                                    {/* <td>{data.mobile}</td> */}
                                    <td>{data.age}</td>
                                    <td>{data.disease}</td>
                                    {/* <td>{data.address}</td> */}
                                    <td>
                                        {data.status === 'P' ?
                                            <>
                                                <Button style={{ marginRight: '1rem' }} variant='outline-primary' className='buttonStyle ' size='sm' onClick={() => statusHandler(data, 'P')}>Cancel</Button>
                                                <Button variant='outline-danger' className='buttonStyle ' size='sm' onClick={() => statusHandler(data, 'A')}>Approved</Button>
                                            </>
                                            : data.status === 'A' ? <span style={{ color: 'green' }}>Approved</span> : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
                }
                {scrMode === 'VIEWPATIENT' &&

                    < PatientInfo />
                }


            </Row>
        </Container>
    )
}

export default AllAppointments

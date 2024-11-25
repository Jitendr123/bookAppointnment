import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import * as Common from './Common';


function PatientInfo() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [loader, setLoader] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalMsg, setModalMsg] = useState([]);
    const [scrMode, setScrMode] = useState('ADDNEW')
    const [address, setAddress] = useState();
    const [disease, setDisease] = useState();
    const [refrence, setRefrence] = useState();
    return (
        <>
            {/* <Container fluid>
                <Row className='webView docbg docMain'> */}
            <h4 className='borderBottom' style={{ textAlign: 'left' }}>Patient Information</h4>
            <Row className='bg-white' style={{ padding: '20px', borderRadius: '1rem' }}>
                <Row className="mb-2">
                    <Form.Group >
                        <Form.Label> Full Name<span className="text-danger">*</span> </Form.Label>
                        <Form.Control
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type='text'
                            size="sm"
                            placeholder="Enter Full Name"
                        />
                    </Form.Group>
                </Row>
                <Row className='mb-2'>
                    <Form.Group className='col-md-6 '>
                        <Form.Label>Gender<span className="text-danger">*</span></Form.Label>
                        <Form.Select value={gender} onChange={(e) => setGender(e.target.value)} required>
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='col-md-6 ' >
                        <Form.Label>Age <span className="text-danger">*</span></Form.Label>
                        <Form.Control type="number"
                            placeholder="Enter Age"
                            maxLength={3}
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            onBlur={(e) => Common.validateNumValue(e.target.value, setAge)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-2">
                    <Col>
                        <Form.Group>
                            <Form.Label>Mobile<span className="text-danger">*</span> </Form.Label>
                            <Form.Control
                                type='text'
                                value={mobile}
                                size="sm"
                                maxLength={10}
                                placeholder="Enter Mobile Number"
                                onChange={(e) => Common.validateNumValue(e.target.value, setMobile)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Email(Optional) </Form.Label>
                            <Form.Control type="email"
                                placeholder="Enter Email"
                                size="sm"
                                maxLength={20}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={(e) => Common.validtateEmail(e.target.value, setEmail)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Form.Group>
                        <Form.Label>Disease </Form.Label>
                        <Form.Control type="text"
                            placeholder="Enter Problem"
                            size="sm"
                            maxLength={200}
                            value={disease}
                            onChange={(e) => setDisease(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-2">
                    <Form.Group>
                        <Form.Label>Address </Form.Label>
                        <Form.Control type="text"
                            placeholder="Address...."
                            size="sm"
                            maxLength={200}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-2">
                    <Form.Group>
                        <Form.Label>Refrence </Form.Label>
                        <Form.Control type="text"
                            placeholder="Kisne Bheja"
                            size="sm"
                            maxLength={200}
                            value={refrence}
                            onChange={(e) => setRefrence(e.target.value)}
                        />
                    </Form.Group>
                </Row>
            </Row>
            {/* </Row >
            </Container> */}
        </>
    )
}

export default PatientInfo

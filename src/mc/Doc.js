import React, { useState } from 'react'
import { Button, ButtonGroup, Col, Container, Form, Row } from 'react-bootstrap';
import * as Common from './Common';
import '../App.css'
import Loader from './Loader';
import Dialog from './Dialog';
import { useNavigate } from 'react-router-dom';

function Doc() {
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


    function cancelConfirm() {
        setName('');
        setMobile('');
        setGender(null);
        setAge('');
        setEmail('');
        setAddress();
        setDisease();
    }
    function submitForm() {
        console.log('submit click')
        let msg = [], i = 0;
        msg[i++] = 'Please fill mandatory feilds.'
        !name && (msg[i++] = 'Name');
        !mobile && (msg[i++] = 'Mobile');
        !gender && (msg[i++] = 'Gender');
        !age && (msg[i++] = 'Age');
        if (i > 1) {
            setModal(true);
            setModalMsg(msg);
        } else {
            const obj = {
                name: name,
                mobile: mobile,
                gender: gender,
                age: age,
                email: email,
                disease: disease,
                address: address
            }
            setLoader(true);
            setTimeout(() => {
                setLoader(false);
                setModal(true)
                cancelConfirm();
                setModalMsg(['Your Appointment book Succesfully'])
            }, 2000)
        }
    }

    function getList() {
    }



    return (
        <>
            {loader ? <Loader /> :
                <Container fluid>
                    <Row className='webView docbg docMain'  >
                        <h4 className='borderBottom' style={{ textAlign: 'left' }}>CHECKOUT</h4>
                        <Row className='docCard' style={{ margin: 'auto' }}>
                            <Col className='col-md-4 leftCol bg-white ' style={{ padding: '20px', borderRadius: '1rem' }} >
                                <img className='docImg' src="../image/docImg.jpeg" alt="" />
                                <Row style={{ marginTop: '10px' }}>
                                    <h4 className='borderBottom'>Dr. Jitendra Arya</h4>
                                    <p>MBBS MS | 10 Yrs. Exp</p>
                                    <p>ENT Specialist</p>
                                </Row>
                                <div className='docDetails' >
                                    <div className='borderBottom docDetailText'>Appointment Details  </div>
                                    <div className='docDetailText' style={{ paddingTop: '16px' }}>Clinic Visit</div>
                                    <div className='docDetailText'>{Common.dateDMY(new Date()) + ' ' + '02:00 PM'} </div>
                                    <div className='docDetailText'>Jay Durga Medical Store<br /> Before Vardhaman Hospital<br /> Opposite Medical Gate No.1 Kanpur Road Jhansi </div>
                                </div>
                            </Col>

                            <Col className='col-md-7 rightCol bg-white' style={{ padding: '20px', borderRadius: '1rem' }}>
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
                                <Row className='mb-2'>
                                    <Col style={{ display: 'flex', gap: '2rem' }}>
                                        <Button variant='outline-primary' className='buttonStyle ' size='sm' onClick={submitForm}>Submit</Button>
                                        <Button variant='outline-danger' className='buttonStyle ' size='sm' onClick={cancelConfirm}>Back  </Button>
                                        <Button variant='outline-info' className='buttonStyle ' size='sm' onClick={() => navigate('/all-appointment')}>All Appointment  </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <p className="fw-bold text-decoration-underline blue" onClick={() => navigate('/already-visited')}>Already Visited</p>
                                </Row>
                            </Col>
                        </Row>
                    </Row>
                </Container>
            }
            <Dialog show={modal} text={modalMsg} onClose={() => setModal(false)} />

        </>
    )
}

export default Doc

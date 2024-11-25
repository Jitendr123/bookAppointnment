import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import '../mcss/Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [OpenMobileView, setOpenMobileView] = useState(false);
    function openPhoneMenu() {
        setOpenMobileView(!OpenMobileView);
    }


    return (
        <>
            <div >
                <nav className="navbar  webView container-fluid">
                    {/* <Row className='container-fluid'> */}
                    <Col className='col-md-3 text-center'>
                        <a onClick={() => navigate('/')}>  <img src="../image/entlogo.jpg" style={{ height: '4rem' }} alt="zlogo" />  </a>
                    </Col>
                    <Col className=' col-md-3 text-center'>
                        <FontAwesomeIcon style={{ height: '2rem', paddingBlock: '1rem' }} icon={faUser} />
                    </Col>
                    {/* </Row> */}
                </nav >
            </div>
        </>
    )
}
export default Navbar;

import React from 'react';
import { Button, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

let dialogStyles = {
    width: '500px',
    maxWidth: '80%',
    margin: '0 auto',
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: '999',
    backgroundColor: '#fff',
    padding: '10px 20px 40px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 0 40px 20px rgba(0,0,0,0.26)'
};

let dialogCloseButtonStyles = {
    marginBottom: '15px',
    padding: '3px 8px',
    cursor: 'pointer',
    borderRadius: '50%',
    border: 'none',
    width: '30px',
    height: '30px',
    fontWeight: 'bold',
    alignSelf: 'flex-end'
}

function Dialog(props) {
    console.log(props)
    return (<>
        {props?.show &&
            <>
                <div style={dialogStyles}>
                <button style={dialogCloseButtonStyles} onClick={props.onClose}><FontAwesomeIcon icon={faClose} /></button>
                    <div>
                    {props?.text.map((data,index) => (<Row key={index} className='row col-sm-12'>{data}</Row>))}
                    </div>
                    <br></br>
                    <div style={{ "textAlign": "center" }}>
                        <Button variant="outline-success" className='buttonStyle' size="sm" onClick={props.onClose}  >OK</Button>
                    </div>
                </div>
            </>
        }
    </>
    );
}

export default Dialog;
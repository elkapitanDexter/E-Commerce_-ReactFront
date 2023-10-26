import React, { useState } from 'react'
import { Modal, Button, Pagination, Form, InputGroup } from 'react-bootstrap';
import AlertCustom from '../components/AlertCustom'

export default function ModalBusiness(props) {
    const [alertState, setAlertState] = useState(false);
    const [alertOption, setAlertOption] = useState('warning');
    const [alertMessage, setAlertMessage] = useState('');
    
    const [businessName, setBusinessName] = useState('');
    const [bNErr, setBNErr] = useState(false);
    const [businessBackground, setBusinessBackground] = useState('');
    const [bBErr, setBBErr] = useState(false);
    const [businessAddress, setBusinessAddress] = useState('');
    const [bAErr, setBAErr] = useState(false);
    const [businessMobile, setBusinessMobile] = useState('');
    const [bMobErr, setBMobErr] = useState('');
    const [businessSecMobile, setBusinessSecMobile] = useState('');
    const [bSErr, setBSErr] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const submitBasicBusinessInfo = (ev) => {
        ev.preventDefault();
        let err = 0;
        if(businessName === ""){
            err = 1
            setBNErr(true)
        }else{ setBNErr(false) }
        if(businessBackground === ""){
            err = 1
            setBBErr(true)
        }else{ setBBErr(false) }
        if(businessAddress === ""){
            err = 1
            setBAErr(true)
        }else{ setBAErr(false) }
        if(businessMobile === ""){
            err = 1
            setBMobErr(true)
        }else{ setBMobErr(false) }
        if(businessMobile === businessSecMobile){
            if(err !== 1){
                setAlertMessage("Detected equal mobile numbers.");
                setAlertState(true);
                setBMobErr(true)
                setBSErr(true)
            }
        }else{ 
            setBMobErr(false)
            setBSErr(false)
        }

        if(err === 1){
            setAlertMessage("Fields with asterisk (*) are required.");
            setAlertState(true);
            setAlertOption('warning');
            scrollToTop();
        }
    }

    return (
        <div>
            <Modal
            {...props}
            className='animated bounce'
            variant='secondary'
            size="lg"
            >
                <Modal.Header closeButton className={`${props.lightMode ? 'bg-white text-dark' : 'bg-dark text-white'} cstModalBorderTop`} >
                    <Modal.Title className='headerColor'>New Business</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`${props.lightMode ? 'text-dark bg-white' : 'bg-dark text-white'} cstModalBorderBody`}>
                    <span style={{ display: 'inline-block' }}>
                        Steps
                    </span>
                    <span style={{ display: 'inline-block', marginLeft:'10px' }}>
                        <Pagination size="sm">
                            <Pagination.Item key={1} active={true}>
                                1. Basic Information
                            </Pagination.Item>
                            <span style={{ margin:'5px' }}>{'>>'}</span>
                            <Pagination.Item key={2} active={false}>
                                2. License
                            </Pagination.Item>
                            <span style={{ margin:'5px' }}>{'>>'}</span>
                            <Pagination.Item key={3} active={false}>
                                3. License
                            </Pagination.Item>
                        </Pagination>
                    </span>
                    <div className='mt-3'>
                        { alertState && <AlertCustom  alertOption={alertOption} setAlertState={setAlertState} alertMessage={alertMessage} /> }
                        <form onSubmit={submitBasicBusinessInfo}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor='businessName'>Business Name *:</Form.Label>
                                <Form.Control type="text"
                                value={businessName}
                                name="businessName"
                                id='businessName'
                                onChange={(event) => setBusinessName(event.target.value)}
                                placeholder="ex. Someone Enterprises"
                                className={`custom-placeholder-color ${props.lightMode ? 'bg-white text-dark': 'bg-dark text-white'} ${bNErr ? 'borderErr' : ''}`}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor='businessBackground'>Background *: </Form.Label>
                                <Form.Control
                                as="textarea"
                                value={businessBackground}
                                name="businessBackground"
                                id='businessBackground'
                                rows={3}
                                onChange={(event) => setBusinessBackground(event.target.value)}
                                placeholder='Tell us about your business...'
                                className={`custom-placeholder-color ${props.lightMode ? 'bg-white text-dark': 'bg-dark text-white'} ${bBErr ? 'borderErr' : ''}`}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor='businessAddress'>
                                    Complete Address *: <br/>
                                    <small>{'(House/Block/Phase, Barangay, City/Municipality, Province/State, Country, Postal Code) '}</small>
                                </Form.Label>
                                <Form.Control
                                as="textarea"
                                value={businessAddress}
                                name='businessAddress'
                                id='businessAddress'
                                rows={3}
                                onChange={(event) => setBusinessAddress(event.target.value)}
                                placeholder="Customer/s can easily locate you with transparent address..."
                                className={`custom-placeholder-color ${props.lightMode ? 'bg-white text-dark': 'bg-dark text-white'} ${bAErr ? 'borderErr' : ''}`}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor='businessMobile'>
                                    Primary Mobile No. *:
                                </Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1" className={`custom-placeholder-color ${props.lightMode ? 'bg-white text-dark': 'bg-dark text-white'}`}>+63</InputGroup.Text>
                                    <Form.Control
                                    type='number'
                                    value={businessMobile}
                                    name='businessMobile'
                                    id='businessMobile'
                                    placeholder="Required"
                                    aria-label="Primary Mobile No."
                                    onChange={(event) => setBusinessMobile(event.target.value)}
                                    className={`custom-placeholder-color ${props.lightMode ? 'bg-white text-dark': 'bg-dark text-white'} ${bMobErr ? 'borderErr' : ''}`}
                                    aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor='businessSecMobile'>
                                    Secondary Mobile No.:
                                </Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="basic-addon1" className={`custom-placeholder-color ${props.lightMode ? 'bg-white text-dark': 'bg-dark text-white'}`}>+63</InputGroup.Text>
                                    <Form.Control
                                    type='number'
                                    value={businessSecMobile}
                                    name='businessSecMobile'
                                    id='businessSecMobile'
                                    placeholder="Optional"
                                    aria-label="Secondary Mobile No."
                                    onChange={(event) => setBusinessSecMobile(event.target.value)}
                                    className={`custom-placeholder-color ${props.lightMode ? 'bg-white text-dark': 'bg-dark text-white'} ${bSErr ? 'borderErr' : ''}`}
                                    aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <div className='pt-3 text-end'>
                                <Button variant="primary" type='submit' size='sm' style={{ minWidth:'118px' }}>Next Step {'>'}</Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer className={`${props.lightMode ? 'text-dark bg-white' : 'bg-dark text-white'} cstModalBorderFooter`}>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

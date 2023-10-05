import React, { useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import AlertCustom from '../components/AlertCustom'

import { Spinner, Tooltip, OverlayTrigger, InputGroup, Form, Modal, Button } from 'react-bootstrap';

import axiosClient from '../axios-client';

export default function ModalLoginRegister(props) {
    const { logReg, setLogReg, setUser, setToken } = useStateContext()
    const [alertState, setAlertState] = useState(false);
    const [alertOption, setAlertOption] = useState('danger');
    const [alertMessage, setAlertMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [nameRef, setNameRef] = useState('');
    const [emailRef, setEmailRef] = useState('');
    const [passwordRef, setPasswordRef] = useState('');
    const [rePasswordRef, setRePasswordRef] = useState('');
    const [userN, setUserN] = useState('');
    const [userP, setUserP] = useState('');

    const submitRegForm = (ev) => {
        ev.preventDefault();
        
        let err = 0;
        if(nameRef === "" || emailRef === "" || passwordRef === "" || rePasswordRef === ""){
            setAlertMessage("All fields are required. Please check all empty fields and provide a value to it. Thank you.");
            err = 1;
        }else if(passwordRef !== rePasswordRef){
            setAlertMessage("Password did no match. Please make sure that both password fields are the same.");
            err = 1;
        }else{
            props.stopSpinner(true);
            setAlertState(false);
            setLoading(true);
            const payload = {
                name: nameRef,
                email: emailRef,
                password: passwordRef,
                password_confirmation: rePasswordRef,
            }
            setInputDisabled(true);
            performSubmitCredentialsForRegister(payload);
        }
        if(err === 1){
            setAlertState(true);
            setAlertOption('danger');
        }
    }

    const submitLoginForm = (ev) => {
        ev.preventDefault();

        let err = 0;
        if(userN === "" || userP === ""){
            setAlertMessage("All fields are required. Please check all empty fields and provide a value to it. Thank you.");
            err = 1;
        }else{
            props.stopSpinner(true);
            setAlertState(false);
            setLoading(true);
            const payload = {
                email: userN,
                password: userP,
            }
            setInputDisabled(true);
            performSubmitCredentialsForLogin(payload);
        }
        if(err === 1){
            setAlertState(true);
            setAlertOption('danger');
        }
    }

    const performSubmitCredentialsForRegister = async(payload) => {
        await axiosClient.post('/register', payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
                props.handleClose();
                setLoading(false);
                props.stopSpinner(false);
                setInputDisabled(false);
            })
            .catch(err => {
                setAlertState(true);
                setLoading(false);
                setPasswordRef("");
                setRePasswordRef("");
                setAlertMessage(err.response.data.message);
                props.stopSpinner(false);
                setInputDisabled(false);
            })
    }
    const performSubmitCredentialsForLogin = async(payload) => {
        await axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
                props.handleClose();
                setLoading(false);
                props.stopSpinner(false);
                setInputDisabled(false);
            })
            .catch(err => {
                setLoading(false);
                setUserP("");
                setAlertState(true);
                setAlertMessage(err.response.data.message);
                props.stopSpinner(false);
                setInputDisabled(false);
            })
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {inputDisabled && <div className='padding17'>Please wait...</div> }
                {!inputDisabled &&
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h6>
                                    { logReg && 
                                        <>
                                            <span style={{ color:'#e45353' }}><i className="fa-solid fa-lock-open"></i></span> &nbsp;
                                            Login for Cst E-Commerce
                                        </>
                                    }
                                    { !logReg && 
                                        <>
                                            <span style={{ color:'#548cc0' }}><i className="fa-solid fa-file"></i></span> &nbsp;
                                            New Account for Cst E-Commerce
                                        </>
                                    }
                                </h6>
                            </Modal.Title>
                        </Modal.Header>
                    </>
                }
                
                <Modal.Body>
                    { alertState && <AlertCustom  alertOption={alertOption} setAlertState={setAlertState} alertMessage={alertMessage} />}
                    { logReg && 
                        <>
                            <form onSubmit={submitLoginForm}>
                                <InputGroup size="sm" className="mb-3">
                                    <InputGroup.Text id="userN">Username | Email : </InputGroup.Text>
                                    <Form.Control
                                    type="text"
                                    value={userN}
                                    name="userN"
                                    id="userN"
                                    placeholder="Required"
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    onChange={(event) => setUserN(event.target.value)}
                                    disabled={inputDisabled}
                                    />
                                </InputGroup>
                                <InputGroup size="sm">
                                    <InputGroup.Text id="userP">Password : </InputGroup.Text>
                                    <Form.Control
                                    type="password"
                                    value={userP}
                                    name="userP"
                                    id="userP"
                                    placeholder="Required"
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                    onChange={(event) => setUserP(event.target.value)}
                                    disabled={inputDisabled}
                                    />
                                </InputGroup>
                                <div className='clearfix'></div>
                                <div className='pt-3 text-end'>
                                    <Button variant="primary" type='submit' size='sm' style={{ minWidth:'118px' }} disabled={inputDisabled}>
                                        { loading &&
                                            <>
                                                <Spinner
                                                as="span"
                                                animation="grow"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                />
                                                Logging in, please wait...
                                            </>
                                        }
                                        { !loading && 'LOGIN' }
                                    </Button>
                                    &nbsp;&nbsp;
                                    <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip id="tooltip-top">
                                            Forgot Password?
                                        </Tooltip>
                                    }
                                    >
                                        <Button variant="outline-warning" size='sm' disabled={inputDisabled}>Reset</Button>
                                    </OverlayTrigger>
                                </div>
                            </form>
                        </>
                    }
                    { !logReg &&
                        <>
                            <form onSubmit={submitRegForm}>
                                <div>
                                    <Form.Label htmlFor="nameRef">Complete Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={nameRef}
                                        name="nameRef"
                                        placeholder="Required"
                                        id="nameRef"
                                        aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={(event) => setNameRef(event.target.value)}
                                        disabled={inputDisabled}
                                    />
                                    <Form.Text id="passwordHelpBlock" muted>
                                        <small>Order: Given Name, Middle Initial., Last Name - Optional.</small>
                                    </Form.Text>
                                </div>
                                <div className="mt-3">
                                    <Form.Label htmlFor="emailRef">Email:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={emailRef}
                                        name="emailRef"
                                        placeholder="Required"
                                        id="emailRef"
                                        aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={(event) => setEmailRef(event.target.value)}
                                        disabled={inputDisabled}
                                    />
                                </div>
                                <div className="mt-3">
                                    <Form.Label htmlFor="passwordRef">Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={passwordRef}
                                        name="rePasswordRef"
                                        placeholder="Required"
                                        id="passwordRef"
                                        aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={(event) => setPasswordRef(event.target.value) }
                                        disabled={inputDisabled}
                                    />
                                    <Form.Text id="passwordHelpBlock" muted>
                                        <small>Requires at least 8 characters, including a symbol and a number.</small>
                                    </Form.Text>
                                </div>
                                <div className="mt-3">
                                    <Form.Label htmlFor="rePasswordRef">Confirm Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={rePasswordRef}
                                        name="rePasswordRef"
                                        placeholder="Required"
                                        id="rePasswordRef"
                                        aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={(event) => setRePasswordRef(event.target.value) }
                                        disabled={inputDisabled}
                                    />
                                </div>
                                <div className='clearfix'></div>
                                <div className='pt-3 text-end'>
                                    <Button variant="outline-danger" type='submit' size='sm' disabled={inputDisabled}>
                                        { loading &&
                                            <>
                                                <Spinner
                                                as="span"
                                                animation="grow"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                />
                                                Saving account, please wait...
                                            </>
                                        }
                                        { !loading && 'CREATE ACCOUNT' }
                                    </Button>
                                </div>
                            </form>
                        </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    { logReg && 
                        <>
                            <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id="tooltip-top">
                                    Not <strong>Registered </strong> or <strong>New ?</strong>
                                </Tooltip>
                            }
                            >
                                <Button variant="danger" size='sm' disabled={inputDisabled} onClick={() => {
                                    setLogReg(false);
                                    setAlertState(false);
                                }}>Create Account | Signup</Button>
                            </OverlayTrigger>
                        </>
                    }
                    { !logReg && 
                        <>
                            <OverlayTrigger
                            placement="top"
                            overlay={
                                <Tooltip id="tooltip-top">
                                    Already have an Account?
                                </Tooltip>
                            }
                            >
                                <Button variant="outline-primary" size='sm' disabled={inputDisabled} onClick={() => {
                                    setLogReg(true);
                                    setAlertState(false);
                                }}>Login</Button>
                            </OverlayTrigger>
                        </>
                    }
                    <Button variant="secondary" size='sm' disabled={inputDisabled} onClick={props.handleClose}>
                        Close | Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

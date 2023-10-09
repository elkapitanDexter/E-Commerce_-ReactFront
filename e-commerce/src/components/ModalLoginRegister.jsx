import React, { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import AlertCustom from '../components/AlertCustom'

import { Spinner, Tooltip, OverlayTrigger, InputGroup, Form, Modal, Button } from 'react-bootstrap';

import axiosClient from '../axios-client';

export default function ModalLoginRegister(props) {
    const { logReg, setLogReg, setUser, setToken } = useStateContext()
    const [alertState, setAlertState] = useState(false);
    const [alertOption, setAlertOption] = useState('danger');
    const [loading, setLoading] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(false);
    const [nameRef, setNameRef] = useState('');
    const [emailRef, setEmailRef] = useState('');
    const [passwordRef, setPasswordRef] = useState('');
    const [rePasswordRef, setRePasswordRef] = useState('');
    const [phoneRef, setPhoneRef] = useState('');
    const [genderRef, setGenderRef] = useState('');
    const [birthDay, setBirthDay] = useState('1');
    const [birthMonth, setBirthMonth] = useState('November');
    const [birthYear, setBirthYear] = useState(new Date().getFullYear());
    const [userN, setUserN] = useState('');
    const [userP, setUserP] = useState('');

    const [alertMessage, setAlertMessage] = useState('');

    const startYear = 1940;
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= startYear; year--) {
        years.push(year);
    }

    const handleGenderChange = (event) => {
        setGenderRef(event.target.value);
    }
    const submitRegForm = (ev) => {
        ev.preventDefault();
        
        let err = 0;
        if(nameRef === "" || emailRef === "" || passwordRef === "" || rePasswordRef === "" || phoneRef === "" || genderRef === "" ){
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
                phone: phoneRef,
                gender: genderRef,
                dateOfBirth: birthMonth + " " + birthDay + " " + birthYear,
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
            .then(data => {
                console.log(data);
                let errFound = "";
                try {
                    if(data.response.status){
                        if(data.response.data.errors.name){
                            errFound += data.response.data.errors.name + "\n"
                        }
                        if(data.response.data.errors.email){
                            errFound += data.response.data.errors.email + "\n"
                        }
                        if(data.response.data.errors.password){
                            errFound += data.response.data.errors.password + "\n"
                        }
                        if(data.response.data.errors.phone){
                            errFound += data.response.data.errors.phone + '"\n"'
                        }
                        if(data.response.data.errors.gender){
                            errFound += data.response.data.errors.gender + '\n'
                        }
                        if(data.response.data.errors.dateOfBirth){
                            errFound += data.response.data.errors.dateOfBirth
                        }
                    }
                } catch (error) {
                    errFound = "";
                }
                if(errFound){
                    setAlertMessage(errFound)
                    setAlertState(true);
                }
                if(data.message === "Network Error"){
                    setAlertMessage("Network Error. We will try to fix this issue as soon as possible. We appreciate your patience. Thank you!");
                    setAlertState(true);
                }
                if(data.status === 200){
                    setUser(data.data.user);
                    setToken(data.data.token);
                    props.handleClose();
                }
                setLoading(false);
                props.stopSpinner(false);
                setInputDisabled(false);
            })
            .catch(err => {
                try {
                    setAlertState(true);
                    setLoading(false);
                    setPasswordRef("");
                    setRePasswordRef("");
                    setAlertMessage(err.response.data.message);
                } catch (error) {
                    setAlertMessage("Invalid credentials");
                    setAlertState(true);
                }
                props.stopSpinner(false);
                setInputDisabled(false);
            })
    }
    const performSubmitCredentialsForLogin = async(payload) => {
        await axiosClient.post('/login', payload)
            .then(data => {
                //console.log(data);
                if(data.message === "Network Error"){
                    setAlertMessage("Network Error. We will try to fix this issue as soon as possible. We appreciate your patience. Thank you!");
                    setAlertState(true);
                }else{
                    setUser(data.data.user);
                    setToken(data.data.token);
                    props.handleClose();
                }
                setLoading(false);
                props.stopSpinner(false);
                setInputDisabled(false);
                setUserN("");
                setUserP("");
            })
            .catch(err => {
                try {
                    setLoading(false);
                    setUserP("");
                    setAlertState(true);
                    setAlertMessage(err.response.data.message);
                } catch (error) {
                    setAlertMessage("Invalid credentials");
                    setAlertState(true);
                }
                props.stopSpinner(false);
                setInputDisabled(false);
            })
    }

    useEffect(() => {
    }, [genderRef, birthDay, birthMonth, birthYear]);

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
                className='animated bounce'
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
                                <div className="mt-3">
                                    <Form.Label htmlFor="phoneNumber">11 Digit Phone No.:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={phoneRef}
                                        name="phoneNumber"
                                        placeholder="Required"
                                        id="phoneNumber"
                                        aria-label="Small"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={(event) => setPhoneRef(event.target.value) }
                                        disabled={inputDisabled}
                                    />
                                </div>
                                <div className="mt-3">
                                    <div>Gender</div>
                                    <br/>
                                    <div style={{ paddingLeft:'30px' }}>
                                        <span style={{ display: 'inline-block', alignItems: 'center' }}>
                                            <div style={{ display:'flex' }}>
                                                <Form.Check aria-label="option 1" type="radio" name="gender" onChange={handleGenderChange} id="male-radio" value="Male" className='cursor' /> &nbsp;&nbsp;
                                                <label htmlFor="male-radio" className='cursor'>Male</label>
                                            </div>
                                        </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span style={{ display: 'inline-block', alignItems: 'center'}}>
                                            <div style={{ display:'flex' }}>
                                                <Form.Check aria-label="option 1" type="radio" name="gender" onChange={handleGenderChange} id="female-radio" value="Female" className='cursor' /> &nbsp;&nbsp;
                                                <label htmlFor="female-radio" className='cursor'>Female</label>
                                            </div>
                                        </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span style={{ display: 'inline-block', alignItems: 'center'}}>
                                            <div style={{ display:'flex' }}>
                                                <Form.Check aria-label="option 1" type="radio" name="gender" onChange={handleGenderChange} id="other-radio" value="Other" className='cursor' /> &nbsp;&nbsp;
                                                <label htmlFor="other-radio" className='cursor'>Other</label>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <div>Date of birth:</div>
                                    <span className='cstSpan'>
                                        <Form.Select aria-label="Default select example" name="birthDay" onChange={event => setBirthDay(event.target.value)}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>
                                        </Form.Select>
                                    </span>
                                    <span className='cstSpan'>
                                        <Form.Select aria-label="Default select example" name="birthMonth" onChange={event => setBirthMonth(event.target.value)}>
                                            <option value="January">January</option>
                                            <option value="February">February</option>
                                            <option value="March">March</option>
                                            <option value="April">April</option>
                                            <option value="May">May</option>
                                            <option value="June">June</option>
                                            <option value="July">July</option>
                                            <option value="August">August</option>
                                            <option value="September">September</option>
                                            <option value="October">October</option>
                                            <option value="November">November</option>
                                            <option value="December">December</option>
                                        </Form.Select>
                                    </span>
                                    <span className='cstSpan'>
                                        <Form.Select aria-label="Default select example" name="birthYear" onChange={event => setBirthYear(event.target.value)}>
                                            {years.map((year, index) => (
                                                <option key={index} value={year}>
                                                {year}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </span>
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

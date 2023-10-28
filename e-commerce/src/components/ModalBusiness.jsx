import React, { useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import InputMask from 'react-input-mask';

import { Modal, Button, Pagination, Form, InputGroup, OverlayTrigger, Tooltip, Spinner, ProgressBar } from 'react-bootstrap';
import AlertCustom from '../components/AlertCustom'

export default function ModalBusiness(props) {
    const { user } = useStateContext()
    const [alertState, setAlertState] = useState(false);
    const [alertOption, setAlertOption] = useState('warning');
    const [alertMessage, setAlertMessage] = useState('');
    // section one
    const [idBusinessBasic, setIdBusinessBasic] = useState('');
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
    // section two
    const [idName, setIdName] = useState('');
    const [bidErr, setBidErr] = useState(false);
    const [idNumber, setIdNumber] = useState('');
    const [bidNumErr, setBidNumErr] = useState(false);
    const [idDateExpiry, setIdDateExpiry] = useState('');
    const [bidDEerr, setBidDEerr] = useState(false);
    const [bEmail, setBEmail] = useState('');
    const [fbLink, setFbLink] = useState('');
    // section three
    const [mainIMGerr, setMainIMGerr] = useState(false);
    const [uploadingMainIMG, setUploadingMainIMG] = useState(false);
    const [mainBusImageProgress, setMainBusImageProgress] = useState(0)
    const [imgResult, setImgResult] = useState('');
    const [hasImgRes, setHasImgRes] = useState(false);

    const [regError, setRegError] = useState(false);

    const [loading, setLoading] = useState(false);
    const [inputDisabled, setInputDisabled] = useState(false);

    const [basicInfo, setBasicInfo] = useState(true);
    const [identifications, setIdentifications] = useState(false);
    const [medias, setMedias] = useState(false);

    const handleImageFile = (ev) => {
        let err = 0;
        setMainBusImageProgress(0)
        try {
            if(ev.target.files[0].type === 'image/png' || ev.target.files[0].type === 'image/jpeg' || ev.target.files[0].type === 'image/jpg'){
                if(ev.target.files[0].size < 24000000){ // 24MB
                    setAlertState(false)
                    setMainIMGerr(false)
                    setRegError(false)
                    // const payload = {
                    //     id: idBusinessBasic,
                    //     mainImage: ev.target.files[0].name,
                    // }
                    setLoading(true)
                    submitMainBusImage(ev.target.files[0])
                }else{
                    err = 1
                    setAlertMessage("File is too large.");
                }
            }else{
                err = 1
                setAlertMessage("This accepts PNG and JPG/JPEG format.");
            }
        } catch (error) {}
        if(err === 1){
            setAlertState(true)
            setMainIMGerr(true)
            setRegError(true)
        }
    }
    const validateIdentificationsLinks = (ev) => {
        ev.preventDefault();
        let err = 0;
        if(idName === ""){
            err = 1
            setBidErr(true)
        }else{ setBidErr(false) }
        if(idNumber === ""){
            err = 1
            setBidNumErr(true)
        }else{ setBidNumErr(false) }
        if(idDateExpiry === ""){
            err = 1
            setBidDEerr(true)
        }else{ setBidDEerr(false) }
        if(err === 1){
            setAlertMessage("Please fill field(s) marked with red. Fields with asterisk (*) are required.");
            setAlertState(true)
            setAlertOption('warning')
            setRegError(true)
        }else{
            setAlertState(false)
            setRegError(false)
            const payload = {
                id: idBusinessBasic,
                validIDname: idName,
                idNumber: idNumber,
                idDateExpiry: idDateExpiry,
                businessEmail: bEmail,
                businessFBLink: fbLink,
            }
            setLoading(true)
            setInputDisabled(true)
            submitIdentificationsLinks(payload)
        }
    }
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
        }else{
            if(businessMobile.length < 10){
                setAlertMessage("Mobile no. must be 10 digits or above.")
                setAlertState(true)
                setBMobErr(true)
                setRegError(true)
                setBSErr(false)
            }else{
                if(businessMobile === businessSecMobile){
                    err = 2
                }else{
                    setBMobErr(false)
                    setBSErr(false)
                }
            }
        }

        if(err === 1){
            setAlertMessage("Please fill field(s) marked with red. Fields with asterisk (*) are required.");
            setAlertState(true)
            setAlertOption('warning')
            setRegError(true)
        }else if(err === 2){
            setAlertMessage("Detected equal mobile numbers.")
            setAlertState(true)
            setBMobErr(true)
            setBSErr(true)
            setRegError(true)
        }else{
            setAlertState(false)
            setRegError(false)
            const payload = {
                id: user.id,
                businessName: businessName,
                businessBackground: businessBackground,
                businessAddress: businessAddress,
                businessContactNo1: businessMobile,
                businessContactNo2: businessSecMobile,
            }
            setLoading(true)
            setInputDisabled(true)
            submitBusinessBasic(payload)
        }
    }

    // Uploading main business image...
    const submitMainBusImage = async(data) => {
        const formData = new FormData()
        formData.append('mainImage', data)
        formData.append('id', idBusinessBasic)
        setUploadingMainIMG(true);
        await axiosClient.post('/submitBusMainImage', formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: data => {
                //Set the progress value to show the progress bar
                setMainBusImageProgress(Math.round((100 * data.loaded) / data.total))
            },
        })
            .then(({data}) => {
                setUploadingMainIMG(false);
                if(data.business.b_id){
                    setLoading(false)
                    setInputDisabled(false)
                    setBasicInfo(false)
                    setIdentifications(false)
                    setMedias(true)
                    setImgResult("http://localhost:8000/"+data.business.b_idIMGpath+"/"+data.business.b_idIMGname)
                    setHasImgRes(true)
                }else{
                    setAlertMessage("Unexpected error occurred. Please consult the system administrator.")
                    setAlertState(true)
                }
            })
            .catch(error => {
                setUploadingMainIMG(false);
                setLoading(false)
                setInputDisabled(false)
            })
    }
    const submitIdentificationsLinks = async(payload) => {
        await axiosClient.post('/submitIdentificationsLinks', payload)
            .then(({data}) => {
                if(data.business.b_id){
                    setLoading(false)
                    setInputDisabled(false)
                    setBasicInfo(false)
                    setIdentifications(false)
                    setMedias(true)
                }else{
                    setAlertMessage("Unexpected error occurred. Please consult the system administrator.")
                    setAlertState(true)
                }
            })
            .catch(error => {
                setLoading(false)
                setInputDisabled(false)
            })
    }
    const submitBusinessBasic = async(payload) => {
        await axiosClient.post('/submitBusinessBasic', payload)
            .then(({data}) => {
                if(data.business.b_id){
                    setIdBusinessBasic(data.business.b_id)
                    setLoading(false)
                    setInputDisabled(false)
                    setBasicInfo(false)
                    setIdentifications(true)
                    setMedias(false)
                }else{
                    setAlertMessage("Unexpected error occurred. Please consult the system administrator.")
                    setAlertState(true)
                }
            })
            .catch(error => {
                setLoading(false)
                setInputDisabled(false)
            })
    }

    return (
        <div>
            <Modal
            {...props}
            className='animated bounce'
            variant='secondary'
            size="lg"
            >
                <Modal.Header closeButton className={`${props.lightmode === "true" ? 'bg-white text-dark' : 'bg-dark text-white'} cstModalBorderTop`} >
                    <Modal.Title className={`${props.lightmode === "true" ? 'text-dark' : 'headerColor'}`}>New Business</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`${props.lightmode === "true" ? 'text-dark bg-white' : 'bg-dark text-white'} cstModalBorderBody`}>
                    <span style={{ display: 'inline-block' }}>
                        { !loading && 'Steps' }
                        { loading && 'Steps > ' }
                    </span>
                    <span style={{ display: 'inline-block', marginLeft:'10px' }}>
                        { !loading && 
                            <Pagination size="sm">
                                <Pagination.Item key={1} active={basicInfo}>
                                    1. Basic Information
                                </Pagination.Item>
                                <span style={{ margin:'5px' }}>{'>>'}</span>
                                <Pagination.Item key={2} active={identifications}>
                                    2. Identifications and Links
                                </Pagination.Item>
                                <span style={{ margin:'5px' }}>{'>>'}</span>
                                <Pagination.Item key={3} active={medias}>
                                    3. Medias and Files
                                </Pagination.Item>
                            </Pagination>
                        }
                        { loading && 'Please wait...' }
                    </span>
                    <div className='mt-3'>
                        { alertState && <AlertCustom alertOption={alertOption} setAlertState={setAlertState} alertMessage={alertMessage} lightmode={props.lightmode.toString()} /> }
                        { medias && 
                            <>
                                {hasImgRes ? (
                                    <>
                                        <small>Image Uploaded:</small>
                                        <img src={imgResult} alt="" style={{ width:'100%' }} />
                                    </>
                                ) : (
                                    <>
                                        <Form.Group controlId="formFile">
                                            <Form.Label>Main IMAGE for your Business *:</Form.Label>
                                            <Form.Control 
                                            type="file"
                                            name="file"
                                            disabled={inputDisabled}
                                            onChange={handleImageFile}
                                            className={`form-control custom-placeholder-color ${props.lightmode === "true" ? 'bg-white text-dark': 'bg-dark text-white'} ${mainIMGerr ? 'borderErr' : ''}`} />
                                        </Form.Group>
                                        { uploadingMainIMG && <ProgressBar animated variant="success" now={mainBusImageProgress} label={`Uploading ${mainBusImageProgress}%`} />}
                                    </>
                                )}
                                <div className='text-end mt-3'>
                                    <Button variant="primary" type='submit' size='sm' style={{ minWidth:'118px' }} disabled={inputDisabled}>
                                        {regError && 
                                            <OverlayTrigger
                                            placement="bottom"
                                            overlay={<Tooltip id="button-tooltip-2">Please check any ERROR</Tooltip>}
                                            >
                                                <i className="fa-solid fa-triangle-exclamation text-danger"></i>
                                            </OverlayTrigger>
                                        }
                                        &nbsp;{' '}
                                        { loading &&
                                            <>
                                                <Spinner
                                                as="span"
                                                animation="grow"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                />
                                                Adding new Business, please wait...
                                            </>
                                        }
                                        { !loading && 'Finish'}
                                    </Button>
                                </div>
                            </>
                        }
                        { identifications && 
                            <>
                                <form onSubmit={validateIdentificationsLinks}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor='idName'>Valid ID *:</Form.Label>
                                        <Form.Control type="text"
                                        value={idName}
                                        name="idName"
                                        id='idName'
                                        disabled={inputDisabled}
                                        onChange={(event) => setIdName(event.target.value)}
                                        placeholder="ex. Driver's License"
                                        className={`custom-placeholder-color ${props.lightmode === "true" ? 'bg-white text-dark': 'bg-dark text-white'} ${bidErr ? 'borderErr' : ''}`}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor='idNumber'>{idName} No. *:</Form.Label>
                                        <Form.Control
                                        type="text"
                                        value={idNumber}
                                        name="idNumber"
                                        id='idNumber'
                                        disabled={inputDisabled}
                                        onChange={(event) => setIdNumber(event.target.value)}
                                        placeholder="ID no. of previously inputted valid ID"
                                        className={`custom-placeholder-color ${props.lightmode === "true" ? 'bg-white text-dark': 'bg-dark text-white'} ${bidNumErr ? 'borderErr' : ''}`}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor='idDateExpiry'>ID Date Expiry *:</Form.Label>
                                        <InputMask
                                        mask="99/99/9999"
                                        type="text"
                                        value={idDateExpiry}
                                        name="idDateExpiry"
                                        id='idDateExpiry'
                                        disabled={inputDisabled}
                                        onChange={(event) => setIdDateExpiry(event.target.value)}
                                        placeholder="mm/dd/yyyy"
                                        className={`form-control custom-placeholder-color ${props.lightmode === "true" ? 'bg-white text-dark': 'bg-dark text-white'} ${bidDEerr ? 'borderErr' : ''}`}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor='bEmail'>Business Email:</Form.Label>
                                        <Form.Control
                                        type="email"
                                        value={bEmail}
                                        name="bEmail"
                                        id='bEmail'
                                        disabled={inputDisabled}
                                        onChange={(event) => setBEmail(event.target.value)}
                                        placeholder="Business Email (Optional)"
                                        className={`custom-placeholder-color ${props.lightmode === "true" ? 'bg-white text-dark': 'bg-dark text-white'}`}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor='fbLink'>FB Link:</Form.Label>
                                        <Form.Control
                                        type="text"
                                        value={fbLink}
                                        name="fbLink"
                                        id='fbLink'
                                        disabled={inputDisabled}
                                        onChange={(event) => setFbLink(event.target.value)}
                                        placeholder="FB Business Link (Optional)"
                                        className={`custom-placeholder-color ${props.lightmode === "true" ? 'bg-white text-dark': 'bg-dark text-white'}`}
                                        />
                                    </Form.Group>
                                    <div className='text-end'>
                                        <Button variant="primary" type='submit' size='sm' style={{ minWidth:'118px' }} disabled={inputDisabled}>
                                            {regError && 
                                                <OverlayTrigger
                                                placement="bottom"
                                                overlay={<Tooltip id="button-tooltip-2">Please check any ERROR</Tooltip>}
                                                >
                                                    <i className="fa-solid fa-triangle-exclamation text-danger"></i>
                                                </OverlayTrigger>
                                            }
                                            &nbsp;{' '}
                                            { loading &&
                                                <>
                                                    <Spinner
                                                    as="span"
                                                    animation="grow"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    />
                                                    Adding new Business, please wait...
                                                </>
                                            }
                                            { !loading && 'Next Step >'}
                                        </Button>
                                    </div>
                                </form>
                            </>
                        }
                        { basicInfo && 
                            <>
                                <form onSubmit={submitBasicBusinessInfo}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor='businessName'>Business Name *:</Form.Label>
                                        <Form.Control type="text"
                                        value={businessName}
                                        name="businessName"
                                        id='businessName'
                                        disabled={inputDisabled}
                                        onChange={(event) => setBusinessName(event.target.value)}
                                        placeholder="ex. Someone Enterprises"
                                        className={`custom-placeholder-color ${props.lightmode === "true" ? 'bg-white text-dark': 'bg-dark text-white'} ${bNErr ? 'borderErr' : ''}`}
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
                                        disabled={inputDisabled}
                                        onChange={(event) => setBusinessBackground(event.target.value)}
                                        placeholder='Tell us about your business...'
                                        className={`custom-placeholder-color ${props.lightmode === "true" ? 'bg-white text-dark': 'bg-dark text-white'} ${bBErr ? 'borderErr' : ''}`}
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
                                        disabled={inputDisabled}
                                        onChange={(event) => setBusinessAddress(event.target.value)}
                                        placeholder="Customer/s can easily locate you with transparent address..."
                                        className={`custom-placeholder-color ${props.lightmode === "true" ? 'bg-white text-dark': 'bg-dark text-white'} ${bAErr ? 'borderErr' : ''}`}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor='businessMobile'>
                                            Primary Mobile No. *:
                                        </Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1" className={`custom-placeholder-color ${props.lightmode === "true" ? 'bg-white text-dark': 'bg-dark text-white'} ${bMobErr ? 'borderErr' : ''}`}>+63</InputGroup.Text>
                                            <InputMask
                                            mask="999-999-9999"
                                            value={businessMobile}
                                            name='businessMobile'
                                            id='businessMobile'
                                            placeholder="Required"
                                            aria-label="Primary Mobile No."
                                            disabled={inputDisabled}
                                            onChange={(event) => setBusinessMobile(event.target.value)}
                                            className={`form-control custom-placeholder-color ${props.lightmode === "true" ? 'bg-white text-dark': 'bg-dark text-white'} ${bMobErr ? 'borderErr' : ''}`}
                                            aria-describedby="basic-addon1"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor='businessSecMobile'>
                                            Secondary Mobile No.:
                                        </Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1" className={`custom-placeholder-color ${props.lightmode === "true" ? 'bg-white text-dark': 'bg-dark text-white'} ${bSErr ? 'borderErr' : ''}`}>+63</InputGroup.Text>
                                            <InputMask
                                            mask="999-999-9999"
                                            value={businessSecMobile}
                                            name='businessSecMobile'
                                            id='businessSecMobile'
                                            placeholder="Optional"
                                            aria-label="Secondary Mobile No."
                                            disabled={inputDisabled}
                                            onChange={(event) => setBusinessSecMobile(event.target.value)}
                                            className={`form-control custom-placeholder-color ${props.lightmode === "true" ? 'bg-white text-dark': 'bg-dark text-white'} ${bSErr ? 'borderErr' : ''}`}
                                            aria-describedby="basic-addon1"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <div className='text-end'>
                                        <Button variant="primary" type='submit' size='sm' style={{ minWidth:'118px' }} disabled={inputDisabled}>
                                            {regError && 
                                                <OverlayTrigger
                                                placement="bottom"
                                                overlay={<Tooltip id="button-tooltip-2">Please check any ERROR</Tooltip>}
                                                >
                                                    <i className="fa-solid fa-triangle-exclamation text-danger"></i>
                                                </OverlayTrigger>
                                            }
                                            &nbsp;{' '}
                                            { loading &&
                                                <>
                                                    <Spinner
                                                    as="span"
                                                    animation="grow"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    />
                                                    Adding new Business, please wait...
                                                </>
                                            }
                                            { !loading && 'Next Step >'}
                                        </Button>
                                    </div>
                                </form>
                            </>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer className={`${props.lightmode === "true" ? 'text-dark bg-white' : 'bg-dark text-white'} cstModalBorderFooter`}>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

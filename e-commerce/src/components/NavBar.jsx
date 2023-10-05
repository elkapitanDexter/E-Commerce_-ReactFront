import { Link, Navigate } from 'react-router-dom'
import React, {useEffect, useState, useRef} from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

import ModalLoginRegister from '../components/ModalLoginRegister';
import PersistentModalLoading from '../components/PersistentModalLoading'

import { Container, OverlayTrigger, Popover, Image, Button, Form, Navbar, Nav, Spinner } from 'react-bootstrap';

export default function NavBar() {
    const { user, token, setUser, setToken, setLogReg } = useStateContext()
    const [showLoginRegister, setShowLoginRegister] = useState(false);
    const [persistentML, setPersistentML] = useState(false);
    const [messagePersistentModal, setMessagePersistentModal] = useState("");

    const handleCloseLoginRegister = () => setShowLoginRegister(false);
    const handleShowLoginRegister = () => setShowLoginRegister(true);

    const handleClosePersistentML = () => setPersistentML(false);
    const handleOpenPersistentML = () => setPersistentML(true);

    const [spinnerProfileImageLoading, setSpinnerProfileImageLoading] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const target = useRef(null);

    const handleClickOutside = (event) => {
        if (target.current && !target.current.contains(event.target)) {
            setShowOverlay(false);
        }
    };

    const logout = async() => {
        setSpinnerProfileImageLoading(true);
        setShowOverlay(false);
        setMessagePersistentModal("Please wait while the system is logging you out and securing your information...");
        await axiosClient.post('/logout')
            .then(() => {
                setUser({});
                setToken(null);
                setLogReg(true);
                setPersistentML(false);
                setSpinnerProfileImageLoading(false);
                return <Navigate to="/" />
            });
    };

    useEffect(() => {
        if(token && user.name === ""){
            try {
                setSpinnerProfileImageLoading(true)
                axiosClient.get('/user')
                    .then(({data}) => {
                        setUser(data.data)
                        setSpinnerProfileImageLoading(false)
                    })
                    .catch((error) => {
                        console.log(error.message)
                        setSpinnerProfileImageLoading(false)
                    })
            } catch (error) { }
        }
        if (showOverlay) {
            // Add an event listener when the overlay is shown
            document.addEventListener('click', handleClickOutside);
        } else {
            // Remove the event listener when the overlay is hidden
            document.removeEventListener('click', handleClickOutside);
        }
        // Cleanup: Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showOverlay]);


    return (
        <>
            { !token && <ModalLoginRegister handleClose={handleCloseLoginRegister} handleShow={handleShowLoginRegister} show={showLoginRegister} stopSpinner={setSpinnerProfileImageLoading} /> }
            <PersistentModalLoading show={persistentML} handleClose={handleClosePersistentML} message={messagePersistentModal} />
            <Navbar expand="md" className="bg-body-tertiary shad" fixed='top'>
                <Container>
                    <Navbar.Brand href=""><Link to="/" className='myLinkHeading'><b>Cst E-Commerce</b></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto mx-4 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <Navbar.Brand>
                                <Link
                                to="/"
                                className='myLink'
                                >
                                Home
                                </Link>
                            </Navbar.Brand>
                            <Navbar.Brand>
                                <Link
                                to="/About"
                                className='myLink'
                                >
                                About
                                </Link>
                            </Navbar.Brand>
                            <Navbar.Brand>
                                <Link
                                to="/Books"
                                className='myLink'
                                >
                                Books
                                </Link>
                            </Navbar.Brand>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                            type="search"
                            name="searchH"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            size="sm"
                            /> 
                            <Button variant="outline-info" size="sm"><i className="fa-brands fa-searchengin"></i></Button>
                        </Form>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant="light outline-dark" size='sm' className='border'><i className="fa-solid fa-moon"></i></Button>
                        &nbsp;&nbsp;&nbsp;
                        { (!token && !spinnerProfileImageLoading) && <Button variant="light outline-dark" onClick={handleShowLoginRegister} size="sm" className="border">Login | Signup</Button> }
                        { (token || spinnerProfileImageLoading) && 
                            <>
                                <OverlayTrigger
                                    trigger="click"
                                    placement="bottom"
                                    show={showOverlay}
                                    onToggle={(show) => setShowOverlay(show)}
                                    overlay={
                                        <Popover id="popover-positioned-bottom">
                                        <Popover.Header as="h3"><small>Logged-in as</small><br/>{ user.name }</Popover.Header>
                                        <Popover.Body>
                                            <Link to="/UserAccount" className='myLink'><div className='profileOption cursor'><strong>My Account</strong></div></Link>
                                            <div className='profileOption mt-1 cursor'><strong>My Purchase</strong></div>
                                            <div 
                                            className='profileOption mt-1 cursor' 
                                            onClick={() => {
                                                handleOpenPersistentML();
                                                logout();
                                            }}
                                            >
                                                <strong>Logout</strong>
                                            </div>
                                        </Popover.Body>
                                        </Popover>
                                    }
                                    >
                                    <div>
                                        { spinnerProfileImageLoading &&
                                            <>
                                                <Spinner animation="border" role="status" variant="secondary" style={{ width:'28px', height:'28px' }}>
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            </>
                                        }
                                        { !spinnerProfileImageLoading && <Image ref={target} className='avatarIMG cursor skeleton' src="dexter.JPG" alt="" roundedCircle/>}
                                    </div>
                                </OverlayTrigger>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

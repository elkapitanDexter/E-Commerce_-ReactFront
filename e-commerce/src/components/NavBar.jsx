import { Link, Navigate } from 'react-router-dom'
import React, {useEffect, useState, useRef} from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

import ModalLoginRegister from '../components/ModalLoginRegister';
import PersistentModalLoading from '../components/PersistentModalLoading'

import { Container, OverlayTrigger, Popover, Image, Button, Form, Navbar, Nav, Spinner } from 'react-bootstrap';

export default function NavBar() {
    const { user, token, lightMode, baseUrl, setUser, setToken, setLogReg, setLightMode } = useStateContext()
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
        if(lightMode){
            document.body.style.backgroundColor = 'rgb(222, 221, 221)';
            document.body.style.color = '#393939';
        }else{
            document.body.style.backgroundColor = '#4a4e52';
            document.body.style.color = 'white';
        }
        // Cleanup: Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showOverlay, lightMode]);


    return (
        <>
            { !token && <ModalLoginRegister handleClose={handleCloseLoginRegister} handleShow={handleShowLoginRegister} show={showLoginRegister} stopSpinner={setSpinnerProfileImageLoading} /> }
            <PersistentModalLoading show={persistentML} handleClose={handleClosePersistentML} message={messagePersistentModal} />
            <Navbar expand="md" className={`${lightMode ? 'bg-body-tertiary shad' : 'bg-dark shad' }`} fixed='top'>
                <Container>
                    <Navbar.Brand href=""><Link to="/" className='myLinkHeading'><b>Cst E-Commerce</b></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" className={`${lightMode ? 'bg-white' : 'bg-dark-subtle' }`} />
                    <Navbar.Collapse id="navbarScroll" >
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
                            aria-label="Search"
                            className={`me-1 ${lightMode ? 'bg-body-tertiary text-dark' : 'bg-dark bg-gradient text-white'}`}
                            placeholder="Search"
                            size="sm"
                            /> 
                            <Button variant="outline-info" size="sm"><i className="fa-brands fa-searchengin"></i></Button>
                        </Form>
                        <span className='px-2' style={{ display:'inline-block' }}>
                            <Button variant={`${lightMode ? 'light' : 'dark'}`} size='sm' className='border' onClick={() => setLightMode(!lightMode)}>
                                {lightMode && <i className="fa-solid fa-moon"></i>}
                                {!lightMode && <i className="fa-solid fa-cloud-sun"></i>}
                            </Button>
                        </span>
                        { (!token && !spinnerProfileImageLoading) && <Button variant={`${lightMode ? 'light' : 'dark'} outline-dark`} onClick={handleShowLoginRegister} size="sm" className="border">Login | Signup</Button> }
                        { (token || spinnerProfileImageLoading) && 
                            <>
                                <span className='pe-2'>
                                    <Link to="/Account/MyNotification">
                                        <Button variant={`${lightMode ? 'light' : 'dark'} outline-dark`} size="sm" className="border position-relative">
                                            <i className="fa-regular fa-bell"></i>
                                            <span className="position-absolute top-2 start-90 translate-middle badge rounded-pill bg-danger">
                                                <small style={{ fontSize:'8px' }}>9</small>
                                            </span>
                                        </Button>
                                    </Link>
                                </span>
                                <span className='pe-2'>
                                    <Button variant={`${lightMode ? 'light' : 'dark'} outline-dark text-warning`} size="sm" className="border"><i className="fa-solid fa-cart-shopping"></i></Button>
                                </span>
                                <OverlayTrigger
                                    trigger="click"
                                    placement="bottom"
                                    show={showOverlay}
                                    onToggle={(show) => setShowOverlay(show)}
                                    overlay={
                                        <Popover id="popover-positioned-bottom" className={`${lightMode ? 'bg-body-tertiary' : 'bg-dark bg-gradient'}`}>
                                            <Popover.Header as="h3" className={`${lightMode ? 'bg-body-tertiary' : 'bg-dark bg-gradient'}`}>
                                                <small>Logged-in as</small><br/>{ user.name }
                                            </Popover.Header>
                                            <Popover.Body>
                                                <Link to="/Account" className='myLink'><div className={`profileOption cursor ${lightMode ? 'text-dark' : 'text-white'}`}><strong>Account Settings</strong></div></Link>
                                                <Link to="/Account/MyPurchase" className='myLink'><div className={`profileOption mt-1 cursor ${lightMode ? 'text-dark' : 'text-white'}`}><strong>Purchase</strong></div></Link>
                                                <Link to="/Account/MyVouchers" className='myLink'><div className={`profileOption mt-1 cursor ${lightMode ? 'text-dark' : 'text-white'}`}><strong>Vouchers</strong></div></Link>
                                                <Link to="/Account/MyProducts/MyBusiness" className='myLink'><div className={`profileOption mt-1 cursor ${lightMode ? 'text-dark' : 'text-white'}`}><strong>Sell Products</strong></div></Link>
                                                <div className='borderBottom mt-2'></div>
                                                <div 
                                                className={`profileOption mt-1 cursor ${lightMode ? 'text-dark' : 'text-white'}`}
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
                                    <span>
                                        { spinnerProfileImageLoading &&
                                            <>
                                                <Spinner animation="border" role="status" variant="secondary" style={{ width:'28px', height:'28px' }}>
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            </>
                                        }
                                        { !spinnerProfileImageLoading && <Image ref={target} className='avatarIMG cursor skeleton' src={`${baseUrl}/dexter.JPG`} alt="" roundedCircle style={{ display:'inline-block' }} />}
                                    </span>
                                </OverlayTrigger>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

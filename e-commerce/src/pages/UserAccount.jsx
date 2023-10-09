import React from 'react'
import { Navigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';

import { Container, Row, Col, Image, Card, Nav, Tab, Tabs } from 'react-bootstrap';

export default function UserAccount() {
    const { user, token } = useStateContext();

    if(!token){
        return <Navigate to="/" />
    }

    return (
        <>
            <Container>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col lg={2} className="mt-4 text-center">
                            <Card>
                                <Card.Body className='cstCardBody1'>
                                    <div>
                                        <Image src="dexter.JPG" roundedCircle style={{ width:'60%' }} />
                                        <div className='pt-2 fs-6'>
                                            {user.name}
                                        </div>
                                    </div>
                                    <div className='mt-3 text-start'>
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item>
                                                <Nav.Link eventKey="first" className=" cstTab">My Account</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="second" className=" cstTab">My Purchase</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="third" className=" cstTab">Notification</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="fourth" className=" cstTab">My Vouchers</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={10} className="mt-4">
                            <Tab.Content className='cstTabContent1'>
                                <Tab.Pane eventKey="first">
                                    <Tabs
                                    defaultActiveKey="profile"
                                    transition={false}
                                    >
                                        <Tab eventKey="profile" title="Profile" className='bg-white p-3'>
                                            <div>My Profile</div>
                                        </Tab>
                                        <Tab eventKey="bankCard" title="Bank & Cards" className='bg-white p-3'>
                                            Your bank and cards here...
                                        </Tab>
                                        <Tab eventKey="addresses" title="Addresses" className='bg-white p-3'>
                                            Address Area here...
                                        </Tab>
                                        <Tab eventKey="changePassword" title="Change Password" className='bg-white p-3'>
                                            Change your password here...
                                        </Tab>
                                    </Tabs>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <Tabs
                                    defaultActiveKey="profile"
                                    transition={false}
                                    >
                                        <Tab eventKey="profile" title="Profile" className='bg-white p-3'>
                                            <div>My Profile</div>
                                        </Tab>
                                        <Tab eventKey="bankCard" title="Bank & Cards" className='bg-white p-3'>
                                            Your bank and cards here...
                                        </Tab>
                                        <Tab eventKey="addresses" title="Addresses" className='bg-white p-3'>
                                            Address Area here...
                                        </Tab>
                                    </Tabs>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <Tabs
                                    defaultActiveKey="profile"
                                    transition={false}
                                    >
                                        <Tab eventKey="profile" title="Profile" className='bg-white p-3'>
                                            <div>My Profile</div>
                                        </Tab>
                                        <Tab eventKey="bankCard" title="Bank & Cards" className='bg-white p-3'>
                                            Your bank and cards here...
                                        </Tab>
                                        <Tab eventKey="addresses" title="Addresses" className='bg-white p-3'>
                                            Address Area here...
                                        </Tab>
                                    </Tabs>
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth">
                                    <Tabs
                                    defaultActiveKey="profile"
                                    transition={false}
                                    >
                                        <Tab eventKey="profile" title="Profile" className='bg-white p-3'>
                                            <div>My Profile</div>
                                        </Tab>
                                        <Tab eventKey="bankCard" title="Bank & Cards" className='bg-white p-3'>
                                            Your bank and cards here...
                                        </Tab>
                                        <Tab eventKey="addresses" title="Addresses" className='bg-white p-3'>
                                            Address Area here...
                                        </Tab>
                                    </Tabs>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </>
    )
}

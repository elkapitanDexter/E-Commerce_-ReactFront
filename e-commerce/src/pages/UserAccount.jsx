import React, { useEffect, useState } from 'react'
import { Navigate, useParams, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { useStateContext } from '../contexts/ContextProvider';

import { Container, Row, Col, Image, Card, Nav, Tab, Tabs } from 'react-bootstrap';

export default function UserAccount() {
    const { user, token, baseUrl, lightMode } = useStateContext();
    const { selectedMenu, subSelectedMenu } = useParams();
    const [selection, setSelection] = useState("");
    const [activeTab, setActiveTab] = useState('MyBusiness');

    const navigate = useNavigate();
    const handleTabSelect = (eventKey) => {
        // Navigate to the corresponding route when a tab is selected
        switch (eventKey) {
          case 'MyBusiness':
            navigate('/Account/MyProducts/MyBusiness');
            break;
          case 'BusinessSettings':
            navigate('/Account/MyProducts/BusinessSettings');
            break;
          case 'addresses':
            navigate('/addresses');
            break;
          case 'changePassword':
            navigate('/change-password');
            break;
          default:
            // Handle other eventKeys if needed
            break;
        }
    };

    useEffect(() => {
        if(!selectedMenu){
            setSelection("MyAccount")
        }else{
            setSelection(currentSelection => currentSelection = selectedMenu)
        }
        if(!subSelectedMenu){
            setActiveTab("MyBusiness")
        }else{
            setActiveTab(currentActiveTab => currentActiveTab = subSelectedMenu)
        }
        // console.log(selectedMenu)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMenu, subSelectedMenu])

    if(!token){
        return <Navigate to="/" />
    }

    return (
        <>
            <Container>
                <Tab.Container id="left-tabs-example" activeKey={selection}>
                    <Row>
                        <Col lg={2} className="mt-4 text-center">
                            <Card>
                                <Card.Body className={`${lightMode ? 'bg-white' : 'bg-dark bg-gradient text-white'} cstCardBody1`}>
                                    <div>
                                        <Image src={`${baseUrl}/dexter.JPG`} roundedCircle style={{ width:'60%' }} />
                                        <div className='pt-2 fs-6'>
                                            {user.name}
                                        </div>
                                    </div>
                                    <div className='mt-3 text-start'>
                                        <Nav variant="pills" className="flex-column">
                                            <LinkContainer to="/Account">
                                                <Nav.Link eventKey="MyAccount" className=" cstTab">My Account</Nav.Link>
                                            </LinkContainer>
                                            <LinkContainer to="/Account/MyPurchase">
                                                <Nav.Link eventKey="MyPurchase" className=" cstTab">My Purchase</Nav.Link>
                                            </LinkContainer>
                                            <LinkContainer to="/Account/MyNotification">
                                                <Nav.Link eventKey="MyNotification" className=" cstTab">Notification</Nav.Link>
                                            </LinkContainer>
                                            <LinkContainer to="/Account/MyVouchers" className='mb-2'>
                                                <Nav.Link eventKey="MyVouchers" className=" cstTab">My Vouchers</Nav.Link>
                                            </LinkContainer>
                                            <div className='borderBottom'></div>
                                            <LinkContainer to="/Account/MyProducts/MyBusiness" className='mt-2'>
                                                <Nav.Link eventKey="MyProducts" className=" cstTab">Sell Products</Nav.Link>
                                            </LinkContainer>
                                        </Nav>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={10} className="mt-4">
                            <Tab.Content className={`${lightMode ? 'bg-secondary-subtle' : 'bg-dark bg-gradient text-white'} cstTabContent1`}>
                                <Tab.Pane eventKey="MyAccount">
                                    <Tabs
                                    defaultActiveKey="profile"
                                    transition={false}
                                    >
                                        <Tab eventKey="profile" title="Profile" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            <div>My Profile</div>
                                        </Tab>
                                        <Tab eventKey="bankCard" title="Bank & Cards" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            Your bank and cards here...
                                        </Tab>
                                        <Tab eventKey="addresses" title="Addresses" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            Address Area here...
                                        </Tab>
                                        <Tab eventKey="changePassword" title="Change Password" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            Change your password here...
                                        </Tab>
                                    </Tabs>
                                </Tab.Pane>
                                <Tab.Pane eventKey="MyPurchase">
                                    <Tabs
                                    defaultActiveKey="profile"
                                    transition={false}
                                    >
                                        <Tab eventKey="profile" title="Profile" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            <div>My Purchase</div>
                                        </Tab>
                                        <Tab eventKey="bankCard" title="Bank & Cards" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            Your bank and cards here...
                                        </Tab>
                                        <Tab eventKey="addresses" title="Addresses" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            Address Area here...
                                        </Tab>
                                        <Tab eventKey="changePassword" title="Change Password" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            Change your password here...
                                        </Tab>
                                    </Tabs>
                                </Tab.Pane>
                                <Tab.Pane eventKey="MyNotification">
                                    <Tabs
                                    defaultActiveKey="profile"
                                    transition={false}
                                    >
                                        <Tab eventKey="profile" title="Profile" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            <div>My Notification</div>
                                        </Tab>
                                        <Tab eventKey="bankCard" title="Bank & Cards" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            Your bank and cards here...
                                        </Tab>
                                        <Tab eventKey="addresses" title="Addresses" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            Address Area here...
                                        </Tab>
                                        <Tab eventKey="changePassword" title="Change Password" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            Change your password here...
                                        </Tab>
                                    </Tabs>
                                </Tab.Pane>
                                <Tab.Pane eventKey="MyVouchers">
                                    <Tabs
                                    defaultActiveKey="profile"
                                    transition={false}
                                    >
                                        <Tab eventKey="profile" title="Profile" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            <div>My Voucher</div>
                                        </Tab>
                                        <Tab eventKey="bankCard" title="Bank & Cards" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            Your bank and cards here...
                                        </Tab>
                                        <Tab eventKey="addresses" title="Addresses" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            Address Area here...
                                        </Tab>
                                        <Tab eventKey="changePassword" title="Change Password" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            Change your password here...
                                        </Tab>
                                    </Tabs>
                                </Tab.Pane>
                                <Tab.Pane eventKey="MyProducts">
                                    <Tabs
                                    activeKey={activeTab}
                                    transition={false}
                                    onSelect={handleTabSelect}
                                    >
                                        <Tab eventKey="MyBusiness" title="Business List" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            <div>My Business</div>
                                        </Tab>
                                        <Tab eventKey="BusinessSettings" title="Settings" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            Your bank and cards here...
                                        </Tab>
                                        <Tab eventKey="addresses" title="Addresses" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            Address Area here...
                                        </Tab>
                                        <Tab eventKey="changePassword" title="Change Password" className={`${lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                                            Change your password here...
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

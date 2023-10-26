import React, { useState } from 'react'
import { Tab, Tabs, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import ModalBusiness from './ModalBusiness';

export default function TabContent(props) {
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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <ModalBusiness show={show} onHide={handleClose} />
            <Tab.Content className={`${props.lightMode ? 'bg-secondary-subtle' : 'bg-dark bg-gradient text-white'} cstTabContent1`}>
                <Tab.Pane eventKey="MyAccount">
                    <Tabs
                    defaultActiveKey="profile"
                    transition={false}
                    >
                        <Tab eventKey="profile" title="Profile" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            <div>My Profile</div>
                        </Tab>
                        <Tab eventKey="bankCard" title="Bank & Cards" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            Your bank and cards here...
                        </Tab>
                        <Tab eventKey="addresses" title="Addresses" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            Address Area here...
                        </Tab>
                        <Tab eventKey="changePassword" title="Change Password" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            Change your password here...
                        </Tab>
                    </Tabs>
                </Tab.Pane>
                <Tab.Pane eventKey="MyPurchase">
                    <Tabs
                    defaultActiveKey="profile"
                    transition={false}
                    >
                        <Tab eventKey="profile" title="Profile" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            <div>My Purchase</div>
                        </Tab>
                        <Tab eventKey="bankCard" title="Bank & Cards" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            Your bank and cards here...
                        </Tab>
                        <Tab eventKey="addresses" title="Addresses" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            Address Area here...
                        </Tab>
                        <Tab eventKey="changePassword" title="Change Password" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            Change your password here...
                        </Tab>
                    </Tabs>
                </Tab.Pane>
                <Tab.Pane eventKey="MyNotification">
                    <Tabs
                    defaultActiveKey="profile"
                    transition={false}
                    >
                        <Tab eventKey="profile" title="Profile" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            <div>My Notification</div>
                        </Tab>
                        <Tab eventKey="bankCard" title="Bank & Cards" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            Your bank and cards here...
                        </Tab>
                        <Tab eventKey="addresses" title="Addresses" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            Address Area here...
                        </Tab>
                        <Tab eventKey="changePassword" title="Change Password" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            Change your password here...
                        </Tab>
                    </Tabs>
                </Tab.Pane>
                <Tab.Pane eventKey="MyVouchers">
                    <Tabs
                    defaultActiveKey="profile"
                    transition={false}
                    >
                        <Tab eventKey="profile" title="Profile" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            <div>My Voucher</div>
                        </Tab>
                        <Tab eventKey="bankCard" title="Bank & Cards" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            Your bank and cards here...
                        </Tab>
                        <Tab eventKey="addresses" title="Addresses" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            Address Area here...
                        </Tab>
                        <Tab eventKey="changePassword" title="Change Password" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            Change your password here...
                        </Tab>
                    </Tabs>
                </Tab.Pane>
                <Tab.Pane eventKey="MyProducts">
                    <Tabs
                    activeKey={props.activeTab}
                    transition={false}
                    onSelect={handleTabSelect}
                    >
                        <Tab eventKey="MyBusiness" title="Business List" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            <div>
                                <Card className={`text-center ${props.lightMode ? 'bg-white' : 'bg-dark bg-gradient text-white'} p-3`}>
                                    <Card.Header>No Business</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Add Business Information</Card.Title>
                                        <Card.Text>
                                            Each added business allows Cst E-Commerce to identify products belongs to segments or business.
                                        </Card.Text>
                                        <Button variant="primary" onClick={handleShow}>Add Business</Button>
                                    </Card.Body>
                                    <Card.Footer className="text-muted cursor">Help</Card.Footer>
                                </Card>
                            </div>
                        </Tab>
                        <Tab eventKey="BusinessSettings" title="Settings" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            Your bank and cards here...
                        </Tab>
                        <Tab eventKey="addresses" title="Addresses" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            Address Area here...
                        </Tab>
                        <Tab eventKey="changePassword" title="Change Password" className={`${props.lightMode ? 'bg-white' : 'bg-secondary text-white'} p-3`}>
                            Change your password here...
                        </Tab>
                    </Tabs>
                </Tab.Pane>
            </Tab.Content>
        </>
    )
}

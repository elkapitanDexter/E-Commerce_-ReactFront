import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { useStateContext } from '../contexts/ContextProvider';
import TabContent from '../components/TabContent'

import { Container, Row, Col, Image, Card, Nav, Tab } from 'react-bootstrap';

export default function UserAccount() {
    const { user, token, baseUrl, lightMode } = useStateContext();
    const { selectedMenu, subSelectedMenu } = useParams();
    const [selection, setSelection] = useState("");
    const [activeTab, setActiveTab] = useState('MyBusiness');

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
                            <TabContent activeTab={activeTab} lightMode={lightMode} />
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </>
    )
}

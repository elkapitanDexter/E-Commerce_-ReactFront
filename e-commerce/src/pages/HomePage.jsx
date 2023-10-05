import React, {useEffect, useState} from 'react'
import { useStateContext } from '../contexts/ContextProvider';

import HomeLoading from '../components/HomeLoading';
import axiosClient from '../axios-client';

import { Container, Badge, Col, Row, Button, ListGroup, Card } from 'react-bootstrap';

export default function HomePage() {
  const { products, setProducts } = useStateContext();
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);

  useEffect(() => {
    if(products.length === 0){  // prevents fetching another series of products when useEffect triggers
      axiosClient.get('/products')
        .then(res => {
          setLoadingSkeleton(false);
          setProducts(res.data.products)
        })

      setLoadingSkeleton(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      { loadingSkeleton &&
      <Row>
        <HomeLoading/>
      </Row>
      }
      <Row>
        {products.map((item) => {
          return(
            <Col lg={3} className="mt-4" key={item.prodID}>
              <Card size="md" className='shad2 productCard cursor'>
                <Card.Img variant="top" className='skeleton' src={ "https://source.unsplash.com/featured/" + item.prodID } style={{ height:"200px", overflow:'hidden' }}/>
                <Card.Body>
                  <Card.Title className='prodTitle'>{item.prodName}</Card.Title>
                  <Card.Text className='cstHeightCardDescriptionProduct'>
                    {item.prodDesc}
                  </Card.Text>
                  <Badge bg="primary" className='cursor'>Read more</Badge>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item className='productCard'>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item className='productCard'>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item className='productCard'>
                    <span className='float-end'><small>5k sold</small></span>
                    <Button variant="danger" size="sm"><small>&#8369; 5 off</small></Button>
                  </ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Button variant="warning" size="sm">Find Similar</Button>
                </Card.Body>
              </Card> 
            </Col>
          )
        })}
      </Row>
      <div className='text-center'>
        <Button variant="primary" className='m-4'>Load more</Button>
      </div>
    </Container>
  )
}

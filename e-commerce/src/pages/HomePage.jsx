import React, {useEffect, useState} from 'react'
import { useStateContext } from '../contexts/ContextProvider';

import HomeLoading from '../components/HomeLoading';
import axiosClient from '../axios-client';
import NetworkError from '../pages/NetworkError'

import { Container, Col, Row, Button, ListGroup, Card, Spinner } from 'react-bootstrap';

export default function HomePage() {
  const { products, lightMode, setProducts } = useStateContext();
  const [loadingSkeleton, setLoadingSkeleton] = useState(false);
  const [renderNoError, setRenderNoError] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [offsetRecord, setOffsetRecord] = useState(8);

  const loadMore = async() => {
    setBtnLoading(true)
    setOffsetRecord(currentOffsetRecord => currentOffsetRecord + 8)
    await axiosClient.get('/products/'+offsetRecord+'/8')
        .then(res => {
          //console.log(res)
          if(res.message === "Network Error"){
            setRenderNoError(true)
          }else{
            setProducts((currentProducts) => [...currentProducts, ...res.data.products])
          }
          setLoadingSkeleton(false);
          setBtnLoading(false)
        })
        .catch(error => {})
  }

  const [showButton, setShowButton] = useState(false);
  const scrollThreshold = 200;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    if(products.length === 0){  // prevents fetching another series of products when useEffect triggers
      axiosClient.get('/products/0/8')
        .then(res => {
          //console.log(res.message)
          if(res.message === "Network Error"){
            setRenderNoError(true)
          }
          setLoadingSkeleton(false);
          setProducts(res.data.products)
          //console.log(products);
        })
        .catch((error) => { })

      setLoadingSkeleton(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderNoError])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container>
      { loadingSkeleton &&
      <Row>
        <HomeLoading/>
      </Row>
      }
      { !renderNoError &&
        <>
          <Row>
            {products.map((item) => {
              return(
                <Col lg={3} className="mt-4" key={item.prodID}>
                  <Card size="md" className={`shad2 productCard cursor ${lightMode ? 'bg-body-tertiary' : 'bg-dark bg-gradient'}`}>
                    <Card.Img variant="top" className='skeleton' src="123.jpg" style={{ height:"200px", overflow:'hidden' }}/>
                    <Card.Body>
                      <Card.Title className={`prodTitle ${lightMode ? 'text-dark' : 'text-white'}`}>{item.prodName}</Card.Title>
                      <Card.Text className={`cstHeightCardDescriptionProduct ${lightMode ? 'text-dark' : 'text-white'}`}>
                        {item.prodDesc}
                      </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item className={`productCard ${lightMode ? 'bg-body-tertiary' : 'innerBaseThree text-white'}`}>
                        {Number(item.prodLeft) > 0 && 
                          <>Left: {item.prodLeft}</>
                        }
                        {Number(item.prodLeft) < 1 && 'Sold Out'}
                      </ListGroup.Item>
                      <ListGroup.Item className={`productCard ${lightMode ? 'bg-body-tertiary' : 'innerBaseThree text-white'}`}>&#8369; {item.prodPrice}</ListGroup.Item>
                      <ListGroup.Item className={`productCard ${lightMode ? 'bg-body-tertiary' : 'innerBaseThree text-white'}`}>
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
          <div className='text-center m-5'>
            {btnLoading && 
              <Spinner
              as="span"
              animation="border"
              role="status"
              aria-hidden="true"
              variant={`${lightMode ? 'secondary' : 'light'}`}
              />
            }
            {!btnLoading && <Button variant="primary" onClick={loadMore}>Load more</Button>}
          </div>
        </>
      }
      {renderNoError &&
        <NetworkError/>
      }
      {showButton && <Button variant='secondary' className='cstBtnTWx animated2 bounce' onClick={scrollToTop}><i className="fa-solid fa-chevron-up"></i></Button>}
    </Container>
  )
}

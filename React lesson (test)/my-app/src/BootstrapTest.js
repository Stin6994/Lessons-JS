/* import React, { Component } from 'react'; */
import { Container, Row, Col, Carousel, Form, Button} from 'react-bootstrap';
/* import ExampleCarouselImage from 'components/ExampleCarouselImage'; */


const BootstrapTest = () => {
    return (
        <Container className='mt-5 mb-5'>
            <Row>
                <Col>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>


                <Col>
                    <Carousel>
                        <Carousel.Item>
                            <img src="https://avatars.mds.yandex.net/i?id=0591d802ffd48b5e6d9717158b104ded45243f9d-5232064-images-thumbs&n=13" />
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="https://avatars.mds.yandex.net/i?id=280b783ace14d8bc3808c276f642612353d3ed60f3cac6e5-12422585-images-thumbs&n=13" />
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img src="https://avatars.mds.yandex.net/i?id=58d5c2aa9c2d07f885f1ab9cb6f2bdbeea2fb278a1a7a898-12913927-images-thumbs&n=13" />
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
}

export default BootstrapTest;
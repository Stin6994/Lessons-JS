/* import React, { Component } from 'react'; */
import { Container, Row, Col, Carousel, Form, Button} from 'react-bootstrap';
/* import ExampleCarouselImage from 'components/ExampleCarouselImage'; */


const BootstrapTest = (props) => {
    return (
        <Container className="mt-5 mb-5">
            <Row>
                <Col>
                    {props.left}
                </Col>
                <Col>
                    {props.right}
                </Col>
            </Row>
        </Container>
    );
}

export default BootstrapTest;
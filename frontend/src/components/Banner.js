import {Button, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../images/carousel/1.png';
import image2 from '../images/carousel/2.png';
import image3 from '../images/carousel/3.png';
export default function Banner({data}) {
    console.log(data);

    const {title, content, destination, label} = data;

    return (
        <Row className=''>
            <Col className='p-2 text-center banner-boxShadow '>
                <div className='banner-top'>
                    <h1>{title}</h1>
                    <p>{content}</p>
                    <Link
                        className='btn btnBanner btn-primary '
                        to={destination}>
                        {label}
                    </Link>
                </div>
                <div></div>
            </Col>
            <Carousel className='p-2'>
                <Carousel.Item interval={1800} className='carousel item'>
                    <img
                        className='d-block w-100'
                        src={image1}
                        alt='Image One'
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000} className='carousel item'>
                    <img
                        className='d-block w-100'
                        src={image2}
                        alt='Image Two'
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={2000} className='carousel item'>
                    <img
                        className='d-block w-100'
                        src={image3}
                        alt='Image Two'
                    />
                    <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Row>
    );
}
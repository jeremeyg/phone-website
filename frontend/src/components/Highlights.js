import { Card, Row, Col } from "react-bootstrap";

export default function Highlights(){

	return(

			<Row className="mt-3 mb-3">
			    <Col xs={12} md={4}>
			        <Card className="cardHighlight p-3">
			            <Card.Body>
			                <Card.Title>
			                    <h2>Speed:</h2>
			                </Card.Title>
			                <Card.Text>
			                    We understand that time is valuable, and we’re committed to making our processes as efficient as possible. While we’ve made great strides in delivering fast and reliable service, we’re always looking for ways to speed up our operations and make things even better for our customers.

			                </Card.Text>
			            </Card.Body>
			        </Card>
			    </Col>
			    <Col xs={12} md={4}>
			        <Card className="cardHighlight p-3">
			            <Card.Body>
			                <Card.Title>
			                    <h2>Simple:</h2>
			                </Card.Title>
			                <Card.Text>
			                    We believe in keeping things simple, and we’re always working to simplify our products, promotional offerings, and processes. We understand that life is complicated enough, and we’re dedicated to making our customers’ experiences as straightforward and stress-free as possible.
			                </Card.Text>
			            </Card.Body>
			        </Card>
			    </Col>
			    <Col xs={12} md={4}>
			        <Card className="cardHighlight p-3">
			            <Card.Body>
			                <Card.Title>
			                    <h2>Service:</h2>
			                </Card.Title>
			                <Card.Text>
			                    We’re passionate about providing exceptional service. We always strive to improve and provide a personalized, friendly experience for our customers. Our team is committed to making sure our customers are served well, through personalized attention and friendly support.
			                </Card.Text>
			            </Card.Body>
			        </Card>
			    </Col>
			</Row>

		)

}
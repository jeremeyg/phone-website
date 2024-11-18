import { useState } from "react";
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function ProductCard({productProp}) {

	const { _id, name, description, price, inventoryStock } = productProp;

    return (
	        <Card>
	            <Card.Body>
	                <Card.Title>{ name }</Card.Title>
	                <Card.Subtitle>Description:</Card.Subtitle>
	                <Card.Text>{ description }</Card.Text>
	                <Card.Subtitle>Price:</Card.Subtitle>
	                <Card.Text>&#8369; { price }</Card.Text>
	                <Card.Subtitle>Stock:</Card.Subtitle>
	                <Card.Text>{ inventoryStock }</Card.Text>
	                {/*<Card.Text>Enrollees: { count }</Card.Text>*/}
	                <Link className="btn btn-primary" to={`/products/${_id}`}>Details</Link>
	            </Card.Body>
	        </Card>
	    )
}

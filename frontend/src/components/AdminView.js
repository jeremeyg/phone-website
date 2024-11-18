import { useState, useEffect } from 'react';
import { /*Button,*/ Table } from 'react-bootstrap';

import ArchiveProduct from './ArchiveProduct';
import EditProduct from "./EditProduct";

export default function AdminView({ productsData, fetchData }) {


	const [products, setProducts] = useState([])


	useEffect(() => {
		console.log(productsData);

		const productsArr = productsData.map(product => {
			return (
				<tr key={product._id}>
					<td>{product._id}</td>
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{product.price}</td>
					<td>{product.inventoryStock}</td>
					<td className={product.isActive ? "text-success" : "text-danger"}>
						{product.isActive ? "Available" : "Unavailable"}
					</td>
					<td><EditProduct product={product._id} fetchData={fetchData}/></td>
					<td><ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData}/></td>	
					{/*<td><Button product={product._id}>Edit</Button> </td>	*/}
					{/*<td><Button product={product._id} className="btn-danger">Archive</Button></td>*/}
				</tr>
				)
		})

		setProducts(productsArr)

	}, [productsData, fetchData])


	return(
		<>
			<h1 className="text-center my-4"> Admin Dashboard</h1>
			
			<Table striped bordered hover responsive>
				<thead>
					<tr className="text-center">
						<th>ID</th>
						<th>Name</th>
						<th>Description</th>
						<th>Price</th>
						<th>Stock</th>
						<th>Availability</th>
						<th colSpan="2">Actions</th>
					</tr>
				</thead>

				<tbody>
					{products}
				</tbody>
			</Table>	
		</>

		)
}

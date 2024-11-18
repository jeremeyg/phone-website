import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveProduct({product, isActive, fetchData}) {

	const archiveToggle = (productId) => {
		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/archive/${productId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})

		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data.message === "Product Successfully Deactivated") {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully disabled'
				})
				fetchData();

			}else {
				Swal.fire({
					title: 'Something Went Wrong',
					icon: 'error',
					text: 'Please Try again'
				})
				fetchData();
			}


		})
	}


	const activateToggle = (productId) => {
	fetch(`${process.env.REACT_APP_API_BASE_URL}/products/activate/${productId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	})

	.then(res => res.json())
	.then(data => {
		console.log(data)
		if(data.message === "Product Successfully Activated") {
			Swal.fire({
				title: 'Success',
				icon: 'success',
				text: 'Product successfully enabled'
			})
			fetchData();
		}else {
			Swal.fire({
				title: 'Something Went Wrong',
				icon: 'Error',
				text: 'Please Try again'
			})
			fetchData();
		}


		})
	}
 

	return(
		<>
			{isActive ?

				<Button variant="danger" size="sm" onClick={() => archiveToggle(product)}>Archive</Button>

				:

				<Button variant="success" size="sm" onClick={() => activateToggle(product)}>Activate</Button>

			}
		</>

		)
}
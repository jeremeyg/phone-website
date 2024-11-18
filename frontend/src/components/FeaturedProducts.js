import {useEffect, useState} from 'react';
import {CardGroup} from 'react-bootstrap';
import PreviewProducts from './PreviewProducts';

export default function FeaturedProducts() {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/active`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                console.log(data.product);
                console.log(data.product.length);

                const numbers = [];
                const featured = [];

                const generateRandomNums = () => {
                    let randomNum = Math.floor(
                        Math.random() * data.product.length
                    );

                    if (numbers.indexOf(randomNum) === -1) {
                        numbers.push(randomNum);
                    } else {
                        generateRandomNums();
                    }
                };

                for (let i = 0; i < 5; i++) {
                    generateRandomNums();

                    featured.push(
                        <PreviewProducts
                            data={data.product[numbers[i]]}
                            key={data.product[numbers[i]]._id}
                            breakPoint={2}
                        />
                    );
                }

                setPreviews(featured);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log(previews);

    return (
        <>
            <h2 className='text-center'>Featured Products</h2>
            <CardGroup className='justify-content-center'>{previews}</CardGroup>
        </>
    );
}
  
  


import Banner from "../components/Banner";
import Highlights from "../components/Highlights";
import FeaturedProducts from "../components/FeaturedProducts";


export default function Home() {

    const data = {
        title: "TECHTIQ",
        content: "Smart Tech for Smart People",
        destination: "/products",
        label: "Buy now!"
    }

    return (
        <>
            <Banner data={data}/>
            <FeaturedProducts />
            <Highlights />
        </>
    )
}
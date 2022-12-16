import Head from 'next/head'
import Image from 'next/image'
import DisplayItems from '../components/DisplayItems';
import HomeSlider from '../components/HomeSlider';
import MostPopular from '../components/MostPopular';
import axios from 'axios';



export default function Home(props) {
  const { data } = props


  return (
    <>
      <Head>
        <title>Gusty- Fashion for Man</title>
        <meta name="description" content="Gusty is a trending and leading fashion brand for genz and millennials which provides custom outfits including footwares. " />
        <meta name="keywords" content="Footware , mens custom, men fashion, Hoodies, T-shirt, Shirts, Fashion for men " />
      </Head>
      <div className="px-1 py-2">
        <HomeSlider />
      </div>
      <MostPopular />
      <div className="items">
        <DisplayItems ProductItems = {data}/>
      </div>
    </>
  )
}



export const getServerSideProps = async (ctx) => {
  const base_url = process.env.baseURL
  try {
    let response = await axios.get(`${base_url}/api/get-product/`)
    return {
      props: {
        data: response.data
      }
    }
  } catch (error) {
    return {
      props: {
          error: error
      },
  };
  }




}
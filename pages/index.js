import Head from 'next/head'
import Image from 'next/image'
import DisplayItems from '../components/DisplayItems';
import HomeSlider from '../components/HomeSlider';
import MostPopular from '../components/MostPopular';




export default function Home() {
 


  return (
    <>
      <Head>
        <title>Gusty- Fashion for Man</title>
        <meta name="description" content="Gusty is a trending and leading fashion brand for genz and millennials which provides custom outfits including footwares. " />
        <meta name="keywords" content="Footware , mens custom, men fashion, Hoodies, T-shirt, Shirts, Fashion for men " />
      </Head>
      <div className="px-1 py-2">
        <HomeSlider/>
      </div>
      <MostPopular />
      <div className="items">
        <DisplayItems />
      </div>
    </>
  )
}

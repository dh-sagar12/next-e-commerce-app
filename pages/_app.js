import '../styles/globals.css'
import MobileNav from '../components/MobileNav'
import MobileUpNav from '../components/MobileUpNav'
import MobileFooter from '../components/MobileFooter'

function MyApp({ Component, pageProps }) {
  return <>
      <MobileUpNav/>
      <Component {...pageProps} />
      <MobileFooter/>
      <MobileNav/>
    </>
  
}

export default MyApp

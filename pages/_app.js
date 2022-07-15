import '../styles/globals.css'
import MobileNav from '../components/MobileNav'
import MobileUpNav from '../components/MobileUpNav'
import MobileFooter from '../components/MobileFooter'
import { wrapper } from '../redux/store'


function MyApp({ Component, pageProps }) {

  switch (Component.displayName) {
    case 'Dashboard':
      return <Component {...pageProps} />
      
    default:
      return <>
          <MobileUpNav/>
          <Component {...pageProps} />
          <MobileFooter/>
          <MobileNav/>
        </>
  }
  
}

export default wrapper.withRedux(MyApp)

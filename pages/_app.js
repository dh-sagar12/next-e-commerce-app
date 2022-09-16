import '../styles/globals.css'
import MobileNav from '../components/MobileNav'
import MobileUpNav from '../components/MobileUpNav'
import MobileFooter from '../components/MobileFooter'
import { wrapper } from '../redux/store'
import AppLayout from '../components/admin/AppLayout'
import { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'
import { useState, useEffect } from 'react'



function MyApp({ Component, pageProps }) {

  const [progress, setProgress] = useState(0)

  let router = useRouter()
  const url = router.pathname

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
  }, [router.query])



  return url.includes('admin') ? <>
    <div id='root'>
      <LoadingBar color='#6F43C0' progress={progress} height={4} onLoaderFinished={() => setProgress(0)} waitingTime={500} loaderSpeed={100} />
      <AppLayout Component={Component} pageProps={pageProps} />
    </div>
  </>

    :
    <>
      <div id='root'>
        <LoadingBar color='#6F43C0' progress={progress} height={4} onLoaderFinished={() => setProgress(0)} waitingTime={500} loaderSpeed={100} />
        <MobileUpNav />
        <Component {...pageProps} />
        <MobileFooter />
        <MobileNav />
      </div>
    </>
}



export default wrapper.withRedux(MyApp)

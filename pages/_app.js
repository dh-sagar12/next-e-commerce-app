import '../styles/globals.css'
import MobileNav from '../components/MobileNav'
import MobileUpNav from '../components/MobileUpNav'
import MobileFooter from '../components/MobileFooter'
import { wrapper } from '../redux/store'
import AppLayout from '../components/admin/AppLayout'
import { useRouter } from 'next/router'
import LoadingBar from 'react-top-loading-bar'
import { useState, useEffect } from 'react'
import { updateAuthCredential } from '../redux/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import cookie from 'cookie';
import axios from 'axios'
import handleRefreshToken from '../Functions/getAutoLogin'
import getUserData from '../Functions/getUserData'
import { updateCurrentUser } from '../redux/auth/userDataSlice'

function MyApp({ Component, pageProps }) {
  const currentUser = useSelector(state => state.userDataSlice.currentUser)

  const dispatch = useDispatch()
  const [progress, setProgress] = useState(0)

  let router = useRouter()
  const url = router.pathname


  useEffect(() => {

    if (url.includes('admin') && !currentUser?.is_admin) {

      router.push({
        pathname: '/login',
        query: { next: `${url}` }

      })

      router.events.on('routeChangeComplete', () => {
        setProgress(100)
      })

    }

  }, [router.query])


  useEffect(() => {

    handleRefreshToken().then((data) => {
      // console.log('response', data);
      if (data.status == 200) {
        getUserData().then(data => {
            if (data?.status ==200){
              dispatch(updateCurrentUser(data?.data))
            }
            else{
              dispatch(updateCurrentUser(null))

            }
          
        })
      }
     


    })

    // let authTokens = localStorage.getItem('GustyAuthtokens')
    // dispatch(updateAuthCredential(JSON.parse(authTokens)))

  }, [router])


  // dispatch(updateAuthCredential(data.token))



  return url.includes('admin') && currentUser?.id !== undefined ?
    <div id='root'>
      <LoadingBar color='#6F43C0' progress={progress} height={4} onLoaderFinished={() => setProgress(0)} waitingTime={500} loaderSpeed={100} />
      <AppLayout Component={Component} pageProps={pageProps} />
    </div>

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

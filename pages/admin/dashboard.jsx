import React from 'react'
import NavHeader from '../../components/NavHeader'

const Dashboard = () => {
  return (
    <>
        <div className="h-screen">
            <h1 className='p-26'>
              <NavHeader/>
            </h1>
        </div>
    </>
  )
}


Dashboard.displayName = 'Dashboard'
export default Dashboard  
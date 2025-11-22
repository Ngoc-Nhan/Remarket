import React from 'react'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
  // useEffect(() => {
  //   const bc = new BroadcastChannel('auth_channel')

  //   bc.onmessage = (event) => {
  //     if (event.data === 'logged_in') {
  //       refetch()
  //     }
  //   }

  //   return () => bc.close()
  // }, [])
  // const [isAppLoading, setisAppLoading] = React.useState(true)
  // if (isAppLoading) {
  //   return (
  //     <div
  //       style={{
  //         position: 'fixed',
  //         top: '50%',
  //         left: '50%',
  //         transform: 'translate(-50%, -50%)'
  //       }}
  //     >
  //       <div className='p-10 animate-spin rounded-full border-2 border-t-0 border-amber-300' />
  //     </div>
  //   )
  // }
  // if (user?.role === 'ADMIN') {
  //   return <Navigate to={'/admin/dashboard'} replace />
  // }

  return (
    <div className=''>
      <Navbar />
      <Outlet /> {/* render các trang con ở đây */}
    </div>
  )
}

export default Layout

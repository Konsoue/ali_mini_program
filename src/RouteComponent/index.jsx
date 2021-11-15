import React from 'react'
import { useRoutes, BrowserRouter as Router } from 'react-router-dom'
import Home from '@/pages/home';
import Piano from '@/pages/piano'
import Drum from '@/pages/drums'
import NotFound from '@/pages/notFound'


function CreateRoutes() {
  const element = useRoutes([
    { path: '/', exact: true, element: <Home /> },
    { path: 'piano', element: <Piano /> },
    { path: 'drum', element: <Drum /> },
    { path: 'home', redirectTo: '/' },
    { path: '*', element: <NotFound /> }
  ])
  return element;
}

function RouteComponent() {
  return (
    <Router>
      <CreateRoutes />
    </Router>
  )
}

export default RouteComponent;

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import AllSpots from './components/Spots/AllSpots';
import SpotDetails from './components/Spots/SpotDetails/SpotDetails';
import UpdateSpotForm from './components/Spots/UpdateSpot/UpdateSpotForm';
import CreateSpotForm from './components/Spots/CreateSpot/CreateSpotForm';
import CurrentUserSpots from './components/Spots/CurrentUserSpots';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <AllSpots />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails />
      },
      {
        path: '/spots/new',
        element: <CreateSpotForm />
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpotForm />
      },
      {
        path: '/spots/current',
        element: <CurrentUserSpots />
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />

}

export default App;

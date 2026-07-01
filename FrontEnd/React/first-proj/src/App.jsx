import './App.css'
import Header from './component/Header';
import Body from './component/Body';
import About from './component/About';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Contact from './component/Contact';
import Error from './component/Error';
import RestaurantMenu from './component/RestaurantMenu';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      {/* if path= / */}
      <Outlet />
    </div>
  )
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />
      },
      { 
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
])

function App() {
  return (
    <>
      <Provider store={appStore}>
        <RouterProvider router={appRouter} />
      </Provider>
    </>
  )
}

export default App
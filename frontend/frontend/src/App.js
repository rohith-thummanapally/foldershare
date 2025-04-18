import logo from './logo.svg';
import './App.css';
import  Navbar from './screens/Navbar.js';
import Folderspage from './screens/folderspage.js';
import Filespage from './screens/filespage.js';
import { store } from './store.js';
import { Provider } from "react-redux";
import {createBrowserRouter,RouterProvider} from 'react-router-dom';

function App() {
  const router=createBrowserRouter([
    {path:'/',element:<Folderspage />},
    {path:'/files',element:<Filespage />}
  ]);
  return (
    <>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    </>
  );
}

export default App;

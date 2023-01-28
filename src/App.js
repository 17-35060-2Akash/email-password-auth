import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginBootrap from './components/LoginBootrap';
import RegisterReactBootstarp from './components/RegisterReactBootstarp';
import Main from './layout/Main';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <RegisterReactBootstarp></RegisterReactBootstarp>
      },
      {
        path: '/register',
        element: <RegisterReactBootstarp></RegisterReactBootstarp>
      },
      {
        path: '/login',
        element: <LoginBootrap></LoginBootrap>
      },
    ]
  }
]);



function App() {
  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

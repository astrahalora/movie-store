import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import FavoriteMovies from "./components/FavoriteMovies";
import Cart from "./components/Cart";
import './App.scss';
import OrderCompleted from "./components/OrderCompleted";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="/favorites" element={<FavoriteMovies/>}/>
      <Route path="/checkout" element={<Cart/>}/>
      <Route path="/complete" element={<OrderCompleted/>}/>
    </Route>
  )
)

function App() {
  return <RouterProvider router={router}/>
}

export default App;

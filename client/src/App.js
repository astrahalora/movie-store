import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import './App.scss';
import FavoriteMovies from "./components/FavoriteMovies";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="/favorites" element={<FavoriteMovies/>}/>
    </Route>
  )
)

function App() {
  return <RouterProvider router={router}/>
}

export default App;

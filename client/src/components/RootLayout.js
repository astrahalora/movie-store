import { NavLink, Outlet } from "react-router-dom";
import cinemagic3 from './img/cinemagic3.png'

export default function RootLayout() {
  return (
    <div className="root-layout">
        <header>
            <nav>
                <img src={cinemagic3} alt="Logo"/>
                <NavLink to="/">Movies</NavLink>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

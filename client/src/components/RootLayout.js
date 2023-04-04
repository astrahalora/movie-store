import { NavLink, Outlet } from "react-router-dom";
import cinemagic from './img/cinemagic.png'

export default function RootLayout() {
  const refresh = () => {
    window.location.reload();
  }

  return (
    <div className="root-layout">
        <header>
            <nav>
                <img src={cinemagic} alt="Logo"/>
                <NavLink to="/" onClick={refresh}>Movies</NavLink>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

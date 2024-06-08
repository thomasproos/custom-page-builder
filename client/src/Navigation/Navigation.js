// Import CSS
import './Navigation.css';

// Import dependencies
import { Outlet } from 'react-router-dom';

export default function Navigation() {
  return(
    <>
      <div>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  )
}
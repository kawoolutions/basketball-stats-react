import { NavLink, Outlet } from "react-router-dom";

import "./App.css"

function App() {
    console.log('App rendered');
    return (
        <>
            <h1>App works!</h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/blog">Blog</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">Contact</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </>
    );
}

export default App;
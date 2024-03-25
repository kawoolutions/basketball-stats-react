import { Outlet } from "react-router-dom";

import Layout from "./components/layout/Layout.tsx";

import "primereact/resources/themes/luna-blue/theme.css";
import "primeicons/primeicons.css";
import "./App.css";

export default function App() {
    return (
        <Layout>
            <Outlet></Outlet>
        </Layout>
    );
}

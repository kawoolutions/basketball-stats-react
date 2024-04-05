import * as packageJson from "../../../package.json";
import React from "react";

export default function Footer() {
    return (
        <footer style={{ textAlign: "center" }}>
            <p>Copyright © 2024 Kawoolutions. All rights reserved. Developed using</p>
            <p>
                <a
                    href="https://www.typescriptlang.org"
                    title={packageJson.dependencies["typescript"].substring(1)}
                    target="_blank"
                >
                    TypeScript
                </a>
                &nbsp;|&nbsp;
                <a href="https://react.dev" title={React.version} target="_blank">
                    React
                </a>
                &nbsp;|&nbsp;
                <a
                    href="https://reactrouter.com"
                    title={packageJson.dependencies["react-router-dom"].substring(1)}
                    target="_blank"
                >
                    React Router
                </a>
                &nbsp;|&nbsp;
                <a href="https://react.dev/reference/react/hooks" target="_blank">
                    React Hooks
                </a>
                {/*&nbsp;|&nbsp;*/}
                {/*<a href="https://react-redux.js.org" target="_blank">*/}
                {/*    React Redux*/}
                {/*</a>*/}
                &nbsp;|&nbsp;
                <a
                    href="https://primereact.org"
                    title={packageJson.dependencies["primereact"].substring(1)}
                    target="_blank"
                >
                    PrimeReact
                </a>
            </p>
            <p>
                <a href="https://www.javascript.com" target="_blank">
                    JavaScript
                </a>
                &nbsp;|&nbsp;
                <a href="https://nodejs.org" title={packageJson.engines["node"].substring(1)} target="_blank">
                    Node.js
                </a>
                &nbsp;|&nbsp;
                <a href="https://www.npmjs.com" title={React.version} target="_blank">
                    npm
                </a>
                &nbsp;|&nbsp;
                <a href="https://vitejs.dev" title={packageJson.dependencies["vite"].substring(1)} target="_blank">
                    Vite
                </a>
                &nbsp;|&nbsp;
                <a href="https://www.jetbrains.com/fleet" target="_blank">
                    Fleet
                </a>
                &nbsp;|&nbsp;
                <a href="https://www.jetbrains.com/webstorm" target="_blank">
                    WebStorm
                </a>
                &nbsp;|&nbsp;
                <a href="https://www.github.com/kawoolutions/basketball-stats-react" target="_blank">
                    GitHub
                </a>
            </p>
        </footer>
    );
}
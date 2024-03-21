import "./index.css";

import ReactDOM from "react-dom/client";
import { createBrowserRouter, Link, Outlet, RouterProvider, useParams, useRouteError } from "react-router-dom";

import App from "./App.tsx";
import { useState } from "react";


function Home() {
    return (
        <div>
            <h1>Home</h1>
            <p>Send us a message!</p>
        </div>
    );
}

function Blog() {
    return (
        <div>
            <h1>Blog</h1>
            <p>Read our latest posts or <Link to="add">add a new post</Link>.</p>
            <ul>
                <li><Link to="1">Post 1</Link></li>
                <li><Link to="2">Post 2</Link></li>
                <li><Link to="3">Post 3</Link></li>
                <li><Link to="4">Post 4</Link></li>
                <li><Link to="5">Post 5</Link></li>
            </ul>
            <Outlet></Outlet>
        </div>
    );
}

function Post() {
    const {id} = useParams();
    return (
        <div>
            <h1>Post</h1>
            <p>Read our latest posting {id}!</p>
        </div>
    );
}

function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const errorTitle = validateTitle();
    const errorContent = validateContent();

    function validateTitle() {
        return title.length < 5 ? "Title must be at least 5 characters!" : "";
    }

    function validateContent() {
        return content.length < 10 ? "Content must be at least 10 characters!" : "";
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("Adding post: ", {title, content});
    }

    return (
        <div>
            <h1>Add Post</h1>
            <p>Add a new post!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <br />
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
                    ({title})
                </label>
                <br />
                <label>
                    Content:
                    <br />
                    <textarea value={content} onChange={e => setContent(e.target.value)}/>
                    ({content})
                </label>

                {errorTitle && <p>{errorTitle}</p>}
                {errorContent && <p>{errorContent}</p>}

                <br />
                <button type="submit" disabled={!!(errorTitle || errorContent)}>Submit</button>
            </form>
        </div>
    );
}

function Contact() {
    return (
        <div>
            <h1>Contact</h1>
            <p>Send us a message!</p>
        </div>
    );
}

function About() {
    return (
        <div>
            <h1>About</h1>
            <p>Learn more about us!</p>
        </div>
    );
}

function NotFound() {
    const error: any = useRouteError();
    console.log("Error: ", error)
    return (
        <div>
            <h1>Not Found</h1>
            <p>Sorry, that page doesn't exist!</p>
            <p>Error: {error.statusText || error.message}</p>
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/blog",
                element: <Blog />,
                children: [
                    {
                        path: ":id",
                        element: <Post />
                    },
                    {
                        path: "add",
                        element: <AddPost />
                    }
                ]
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/about",
                element: <About />
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)

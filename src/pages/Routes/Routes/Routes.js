import { createBrowserRouter } from "react-router-dom";
import Blog from "../../Blog/Blog";
import Categories from "../../Home/Categories/Categories";
import Home from "../../Home/Home/Home";
import Main from "../../Layout/Main";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/categories/:name',
                element: <Categories></Categories>,
                loader: ({ params }) => fetch(`http://localhost:5000/categories?category=${params.name}`)
            }
        ]
    }
])
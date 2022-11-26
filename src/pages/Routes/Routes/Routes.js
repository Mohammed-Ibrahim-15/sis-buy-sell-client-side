import { createBrowserRouter } from "react-router-dom";
import Blog from "../../Blog/Blog";
import AllSeller from "../../Dashboard/AllSeller/AllSeller";
import AllUsers from "../../Dashboard/AllUsers/AllUsers";
import MyBooking from "../../Dashboard/MyBooking/MyBooking";
import Categories from "../../Home/Categories/Categories";
import Home from "../../Home/Home/Home";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Login from "../../Login/Login/Login";
import Register from "../../Login/Register/Register";
import ErrorRoutes from "../ErrorRoutes/ErrorRoutes";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorRoutes></ErrorRoutes>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/blog',
                element: <PrivateRoutes><Blog></Blog></PrivateRoutes>
            },
            {
                path: '/categories/:name',
                element: <PrivateRoutes><Categories></Categories></PrivateRoutes>,
                loader: ({ params }) => fetch(`http://localhost:5000/categories?category=${params.name}`)
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        errorElement: <ErrorRoutes></ErrorRoutes>,
        children: [
            {
                path: '/dashboard',
                element: <MyBooking></MyBooking>
            },
            {
                path: '/dashboard/allUsers',
                element: <AllUsers></AllUsers>,

            },
            {
                path: '/dashboard/allSeller',
                element: <AllSeller></AllSeller>,
            },
        ]
    }
])
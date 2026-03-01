import MainTemplate from "./components/templates/mainTemplate";
import HomePage from "./routes/homePage/homePage";
import LogIn from "./routes/login/login";
import Register from "./routes/register/register"

const routes = [
    {
        path: "/",
        element: <MainTemplate />,
        children:[
            {index: true, element: <HomePage />},
        ]
    },
    {
        path: "logIn",
        element: <MainTemplate />,
        children:[
            {index: true, element: <LogIn />}
        ]
    },
    {
        path: "register",
        element: <MainTemplate/>,
        children:[
            {index: true, element: <Register />}
        ]
    }
]

export default routes;
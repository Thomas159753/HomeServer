import MainTemplate from "./components/templates/mainTemplate";
import HomePage from "./routes/homePage/homePage";
import LogInForm from "./routes/login/login";

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
            {index: true, element: <LogInForm />}
        ]
    }
]

export default routes;
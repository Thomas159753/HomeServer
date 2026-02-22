import MainTemplate from "./components/templates/mainTemplate";
import HomePage from "./routes/homePage/homePage";

const routes = [
    {
        path: "/",
        element: <MainTemplate />,
        children:[
            {index: true, element: <HomePage />},
        ]
    }
]

export default routes;
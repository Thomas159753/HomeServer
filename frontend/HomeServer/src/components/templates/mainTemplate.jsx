import { Outlet } from "react-router-dom";

export default function MainTemplate() {
    return (
        <>
                <main>
                    <Outlet />
                </main>
        </>
    )
};
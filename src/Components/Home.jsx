import { Outlet } from "react-router-dom";

export default function Home(){

{/* Main layout component - renders page content using Outlet */}

    return (
        <>
        <h2 className="title">Mikey's Horror Micro Reviews</h2>      
        <main className="container">
            <Outlet />
        </main>
        </>
    )
}
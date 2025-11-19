import { Outlet, Link } from "react-router-dom"

export default function Home(){

{/* Main layout component - renders page content using Outlet */}

    return (
        <>
        <Link to="/">
        <h2 className="title">Mikey's Micro Horror Reviews</h2>
        </Link>
        <main className="container">
            <Outlet />
        </main>
        </>
    )
}
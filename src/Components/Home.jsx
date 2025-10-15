import { Outlet } from "react-router-dom";


export default function Home(){


    return (
        <>
        <h2 className="title">Mikey's Horror Micro Reviews</h2>      
        <main className="container">
            <Outlet />
        </main>
        </>
    )
}
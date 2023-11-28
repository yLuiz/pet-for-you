import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Container from "../components/layout/Container";

import { Context } from "../context/UserContext";


export default function PrivateRoutes() {

    const { authenticated } = useContext(Context);

    

    return (
        <>
            { authenticated ? 
                <Container>
                    <Outlet />
                </Container>
                : 
                <Navigate to='/login'/>
            }
        </>
    );
}
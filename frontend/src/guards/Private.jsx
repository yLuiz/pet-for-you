import { useContext, useEffect } from "react";
import { Context } from "../context/UserContext";
import Container from "../components/layout/Container";
import { Navigate, Outlet } from "react-router-dom";

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
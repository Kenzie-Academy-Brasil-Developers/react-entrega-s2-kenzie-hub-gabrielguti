import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Routes = () => {

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('@kenzieHub:token'))
 
            if(token){
                return setAuthenticated(true);
            }
 
    },[authenticated])

    return (
        <Switch>
            <Route exact path = '/'>
                <Register
                authenticated = {authenticated}
                />
            </Route>
            <Route path = '/login'>
                <Login
                authenticated = {authenticated}
                setAuthenticated = {setAuthenticated}
                />
            </Route>
            <Route path = '/dashboard'>
                <Dashboard 
                authenticated = {authenticated}
                />
            </Route>
        </Switch>
    )
}

export default Routes;
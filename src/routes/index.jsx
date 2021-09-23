import { Route, Switch } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Routes = () => {
    return (
        <Switch>
            <Route exact path = '/'>
                <Register/>
            </Route>
            <Route path = '/login'>
                <Login/>
            </Route>
        </Switch>
    )
}

export default Routes;
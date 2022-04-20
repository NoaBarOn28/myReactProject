import { Route, Switch, Redirect } from "react-router-dom";
import NavBarComponent from "./components/NavBarComponent/NavBarComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";
import LoginPage from "./pages/Login/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import CardsPanelPage from "./pages/CardsPanelPage";
import AuthGuardRoute from "./components/AuthGuardRoute";
import BusinessCard from "./pages/BusinessCard";
import { ToastContainer } from "react-toastify";
import OnlyBizPermitted from "./pages/OnlyBizPermitted";
import Logout from "./components/Logout";
import "./App.css";

function App() {
  return (
    <div className="container">
      <NavBarComponent></NavBarComponent>
      <div className="spice"></div>
      <div className="main">
        <ToastContainer />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home"></Redirect>
          </Route>
          <Route path="/home" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/login" component={LoginPage} />
          <AuthGuardRoute path="/cardspanel" component={CardsPanelPage} />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/businesscard" component={BusinessCard} />
          <Route path="/onlybizpermitted" component={OnlyBizPermitted} />
          <Route path={"/home"} component={Logout} />
        </Switch>
        <FooterComponent></FooterComponent>
      </div>
    </div>
  );
}

export default App;

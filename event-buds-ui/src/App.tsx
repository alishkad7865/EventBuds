import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useContext } from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { Redirect, Route } from "react-router";
import Login from "./pages/Login SignUp/Login";
import Home from "./pages/Home/Home";
import Signup from "./pages/Login SignUp/Signup";
import ManageFriends from "./pages/Manage Friends/ManageFriends";
import CreateEvent from "./pages/Create Event/CreateEvent";
import PublicEvents from "./pages/Public Event/PublicEvent";
import Profile from "./pages/My Profile/Profile";
import {
  home,
  people,
  create,
  calendar,
  person,
  personAdd,
  logIn,
  download,
  informationCircle,
} from "ionicons/icons";
import { UserContext } from "./context/UserContext";
import Download from "./pages/Information/Download";

setupIonicReact();

const App: React.FC = () => {
  const { userLoggedIn } = useContext(UserContext);
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/Home" component={Home} />
            <Route exact path="/ManageFriends" component={ManageFriends} />

            <Route exact path="/CreateEvent" component={CreateEvent} />

            <Route exact path="/publicEvents" component={PublicEvents} />

            <Route exact path="/profile" component={Profile} />

            <Route exact path="/Download">
              <Download />
            </Route>

            <Route exact path="/Login" component={Login} />

            <Route exact path="/Signup" component={Signup} />
            <Route exact path="/">
              {userLoggedIn ? (
                <Redirect to="/Home" />
              ) : (
                <Redirect to="/Login" />
              )}
            </Route>
          </IonRouterOutlet>

          {userLoggedIn ? (
            <IonTabBar slot="bottom">
              <IonTabButton tab="Home" href="/Home">
                <IonIcon icon={home} />
                <IonLabel>My Events</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Add Friends" href="/ManageFriends">
                <IonIcon icon={people} />
                <IonLabel>Friends</IonLabel>
              </IonTabButton>
              <IonTabButton tab="CreateEvent" href="/CreateEvent">
                <IonIcon icon={create} />
                <IonLabel>Create</IonLabel>
              </IonTabButton>
              <IonTabButton tab="PublicEvents" href="/PublicEvents">
                <IonIcon icon={calendar} />
                <IonLabel>Public Events</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Profile" href="/Profile">
                <IonIcon icon={person} />
                <IonLabel>My Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
          ) : (
            <IonTabBar slot="bottom">
              <IonTabButton disabled tab="AboutUs" href="/AboutUs">
                <IonIcon icon={informationCircle} />
                <IonLabel>About Us</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Download" href="/Download">
                <IonIcon icon={download} />
                <IonLabel>Download</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Login" href="/Login">
                <IonIcon icon={logIn} />
                <IonLabel>Login</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Signup" href="/Signup">
                <IonIcon icon={personAdd} />
                <IonLabel>SignUp</IonLabel>
              </IonTabButton>
            </IonTabBar>
          )}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

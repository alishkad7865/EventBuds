import { Redirect, Route } from "react-router-dom";
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
import { addCircle, calendar, home, people, person } from "ionicons/icons";
import React from "react";

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
import CreateEvent from "./pages/Create Event/CreateEvent";
import Home from "./pages/Home/Home";
import ManageFriends from "./pages/Manage Friends/ManageFriends";
import Profile from "./pages/My Profile/Profile";
import PublicEvents from "./pages/Public Event/PublicEvent";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/ManageFriends">
            <ManageFriends />
          </Route>
          <Route exact path="/CreateEvent">
            <CreateEvent />
          </Route>
          <Route exact path="/PublicEvents">
            <PublicEvents />
          </Route>
          <Route exact path="/Profile">
            <Profile />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton class= "tabButton" tab="Home" href="/Home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton class= "tabButton" tab="Add Friends" href="/ManageFriends">
            <IonIcon icon={people} />
            <IonLabel>Friends</IonLabel>
          </IonTabButton>

          <IonTabButton class= "tabButton" tab="CreateEvent" href="/CreateEvent">
            <IonIcon icon={addCircle} />
            <IonLabel>Create</IonLabel>
          </IonTabButton>

          <IonTabButton class= "tabButton" tab="PublicEvents" href="/PublicEvents">
            <IonIcon icon={calendar} />
            <IonLabel>Events</IonLabel>
          </IonTabButton>

          <IonTabButton class= "tabButton" tab="Profile" href="/Profile">
            <IonIcon icon={person} />
            <IonLabel>My Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addCircle, calendar, home, people, person} from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import CreateEvent from './pages/Create Event/CreateEvent';

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/">
              <Tab1 />
            </Route>
            <Route exact path="/Home">
              <Tab1 />
            </Route>
            <Route exact path="/ManageFriends">
              <Tab2 />
            </Route>
            <Route path="/CreateEvent">
              <CreateEvent />
            </Route>
            <Route path="/Events">
              <CreateEvent />
            </Route>
            <Route path="/Profile">
              <CreateEvent />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="top">
            <IonTabButton tab="Home" href="/Home">
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            <IonTabButton tab="Add Friends" href="/ManageFriends">
              <IonIcon icon={people} />
              <IonLabel>Friends</IonLabel>
            </IonTabButton>

            <IonTabButton tab="CreateEvent" href="/CreateEvent">
              {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-circle-plus" /> */}
              <IonIcon icon={addCircle} />
              <IonLabel>Create</IonLabel>
            </IonTabButton>

            <IonTabButton tab="Events" href="/Events">
              <IonIcon icon={calendar} />
              <IonLabel>Events</IonLabel>
            </IonTabButton>

            <IonTabButton tab="Profile" href="/Profile">
              <IonIcon icon={person} />
              <IonLabel>My Profile</IonLabel>
            </IonTabButton>

          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
);

export default App;

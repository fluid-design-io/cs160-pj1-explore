import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  isPlatform,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

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
import "./theme/index.css";
import "./theme/variables.css";

/* Swiper css */
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "@ionic/react/css/ionic-swiper.css";

import ExplorePage from "./pages/Explore";
import clsxm from "./lib/clsxm";

setupIonicReact({
  mode: "ios",
});

const App: React.FC = () => (
  <IonApp>
    <div
      className={clsxm(
        "landscape:hidden py-6 fixed z-50 top-0 left-0 right-0 w-full backdrop-blur-sm backdrop-brightness-75 [-webkit-mask-image:_linear-gradient(black_15px,transparent)]",
        !isPlatform("pwa") && "hidden"
      )}
    />
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/explore" component={ExplorePage} />
        <Route exact path="/">
          <Redirect to="/explore" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

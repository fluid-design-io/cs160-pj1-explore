import {
  IonButton,
  IonContent,
  IonPage,
  useIonModal,
  useIonViewDidEnter,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { MapkitProvider } from "react-mapkit";
import { Park } from "../../typing";
import ExploreMap from "../components/ExploreMap";
import ExploreSheetModal from "../components/ExploreSheetModal";
import HikingStats from "../components/HikingStats";
import ParkForks from "../components/ParkForks";
import WelcomeModal from "../components/WelcomeModal";
import clsxm from "../lib/clsxm";
import { MAP_API } from "../lib/config";
import { checkStorage, setStorage } from "../lib/storageHelper";

const ExplorePage: React.FC = () => {
  const [presentWelcomeModal, dismissWelcomeModal] = useIonModal(WelcomeModal, {
    dismiss: () => handleDismissWelcomeModal(),
  });
  const handleDismissWelcomeModal = async () => {
    await setStorage("welcome_modal_shown", true);
    dismissWelcomeModal();
    setIsReady(true);
    getPosition();
  };
  const [isReady, setIsReady] = useState(false);
  const [currentCoords, setCurrentCoords] = useState({
    latitude: 37.415,
    longitude: -122.048333,
  });
  const [mode, setMode] = useState({
    isHiking: false,
    park: undefined as Park | undefined,
  });
  const pageRef = useRef<HTMLElement>(null);
  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
    getPosition,
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    geolocationProvider: navigator.geolocation,
    suppressLocationOnMount: true,
    watchPosition: true,
  });

  const handleExploreSheetModal = (data?: any, role?: string) => {
    if (role === "confirm") {
      // If role is confirm, for now it is equal to is hiking
      setMode({
        isHiking: true,
        park: data,
      });
    }
  };
  useIonViewDidEnter(async () => {
    if (!(await checkStorage("welcome_modal_shown"))) {
      presentWelcomeModal({
        presentingElement: pageRef.current || undefined,
        canDismiss: true,
        onDidDismiss: handleDismissWelcomeModal,
      });
    } else {
      setIsReady(true);
      getPosition();
    }
  });

  return (
    <IonPage ref={pageRef} className="justify-start">
      <HikingStats isOpen={mode.isHiking} park={mode.park} />
      <IonContent color="light">
        {/* <IonButton onClick={getPosition}>Get</IonButton> */}
        <ExploreSheetModal
          onDismiss={handleExploreSheetModal}
          isOpen={isReady}
        />
        {mode.isHiking ? (
          <div className="px-4">
            <img
              src="/assets/hiking-demo-img.jpg"
              className="object-cover w-full rounded-xl max-h-[24rem] h-[30vh] min-h-[12rem]"
              alt="Hiking guide"
            />
          </div>
        ) : (
          /* @ts-ignore */
          <MapkitProvider tokenOrCallback={MAP_API}>
            <ExploreMap
              coords={
                coords || {
                  latitude: 37.87189917974445,
                  longitude: -122.25855063014997,
                }
              }
            />
          </MapkitProvider>
        )}
        {mode.isHiking && (
          <>
            <div className="ion-padding">
              <IonButton
                expand="block"
                onClick={() =>
                  setMode({
                    isHiking: false,
                    park: undefined,
                  })
                }
              >
                Finish
              </IonButton>
            </div>
            <div className="-mt-8">
              <ParkForks />
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ExplorePage;

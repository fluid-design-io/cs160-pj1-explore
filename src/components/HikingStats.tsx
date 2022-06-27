import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import { ellipsisHorizontalCircle } from "ionicons/icons";
import { Park } from "../../typing";
import ParkWeatherBar from "./ParkWeatherBar";

function HikingStats({
  isOpen,
  park,
}: {
  isOpen: boolean;
  park: Park | undefined;
}) {
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <IonHeader className="bg-light-default">
        <IonToolbar
          className="mt-4 pb-2"
          style={{
            "--background": "transparent",
            "--border-width": "0px",
          }}
        >
          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={ellipsisHorizontalCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <div className="text-primary-default p-4 bg-light-default z-10">
        <div className="-mt-12">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-6xl sm:text-8xl italic font-extrabold ">
                2.9{" "}
                <span className="text-sm text-dark-tint font-semibold">
                  miles
                </span>
              </h1>
              <div className="font-semibold">{park?.name}</div>
              <div className="text-sm text-dark-tint">
                Total Length: {park?.info.distance} mi • 33 minutes to hike
              </div>
            </div>
            <div className="">
              <ParkWeatherBar
                weather={park!.weather.slice(5, 6)}
                className="py-0"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HikingStats;

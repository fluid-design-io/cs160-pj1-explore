import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  useIonPopover,
} from "@ionic/react";
import {
  cameraOutline,
  ellipsisHorizontalCircle,
  notificationsCircleOutline,
  notificationsOutline,
  warningOutline,
} from "ionicons/icons";
import { Park } from "../../typing";
import { convertTime } from "../lib/convertTime";
import ParkWeatherBar from "./ParkWeatherBar";

function HikingStats({
  isOpen,
  park,
}: {
  isOpen: boolean;
  park: Park | undefined;
}) {
  const [presentMorePopover] = useIonPopover(PopoverList);
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <IonHeader className="bg-light-default">
        <IonToolbar
          className=""
          style={{
            "--background": "transparent",
            "--border-width": "0px",
          }}
        >
          <IonTitle className="text-left px-4 flex flex-col gap-0" color="primary">
            <div className="leading-4">
              {park && park.info.distance / 4} mile
              {park && park.info.distance / 4 > 1 ? "s" : ""}
            </div>
            <div className="text-xs text-medium-shade">
              {park && convertTime(Number((park.info.distance / 4) * 3 * 20))}{" "}
              to hike
            </div>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={(e) =>
                presentMorePopover({
                  event: e.nativeEvent,
                  size: "auto",
                })
              }
            >
              <IonIcon icon={ellipsisHorizontalCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  );
}
export default HikingStats;

const PopoverList = () => (
  <IonList>
    <IonItem detail={false} button>
      <IonLabel>Notifications</IonLabel>
      <IonIcon color="primary" slot="end" icon={notificationsOutline} />
    </IonItem>
    <IonItem detail={false} button>
      <IonLabel>Report</IonLabel>
      <IonIcon color="primary" slot="end" icon={warningOutline} />
    </IonItem>
  </IonList>
);

import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
} from "@ionic/react";
import { Park } from "../../typing";
import ParkInfoBar from "./ParkInfoBar";

function PlanCard({
  park,
  onClick,
}: {
  park: Park;
  onClick: (park: Park) => void;
}) {
  return (
    <IonCard onClick={() => onClick(park)}>
      <div className="grid grid-cols-3 gap-0.5">
        <div className="col-span-2">
          <div
            className="h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${park.images[0]})`,
            }}
          ></div>
        </div>
        <div className="grid grid-rows-2 overflow-hidden gap-0.5">
          <div className="aspect-square">
            <IonImg
              src={park.images[1]}
              alt={park.name}
              className="object-cover h-full w-full"
            />
          </div>
          <div className="aspect-square">
            <IonImg
              src={park.images[2]}
              alt={park.name}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
      <IonCardContent>
        <IonCardTitle>{park.name}</IonCardTitle>
        <IonCardSubtitle>
          {park.distanceTo} mi • {park.location}
        </IonCardSubtitle>
        <ParkInfoBar park={park} />
      </IonCardContent>
    </IonCard>
  );
}
export default PlanCard;

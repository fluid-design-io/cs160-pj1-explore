import { IonItem, IonLabel, IonList } from "@ionic/react";
import { useState } from "react";
import { ParkAlert } from "../../typing";
import clsxm from "../lib/clsxm";

function ParkAlertCard({ alert }: { alert: ParkAlert }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <IonList inset className="text-left">
      <div className="px-4 py-2">
        <span className="font-medium text-xs text-medium-shade">
          {new Date(alert.date).toLocaleDateString()}
        </span>
        <h2 className="text-lg font-semibold leading-5 pb-2.5 text-danger-default">
          {alert.title}
        </h2>
        <p className={clsxm("text-base", !expanded && "line-clamp-3")}>
          {alert.description}{" "}
        </p>
      </div>
      <IonItem button detail>
        <IonLabel color="primary">More on nps.gov</IonLabel>
      </IonItem>
    </IonList>
  );
}
export default ParkAlertCard;

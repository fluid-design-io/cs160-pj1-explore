import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { Park } from "../../typing";
import parkList from "../data/parks.json";
import PlanCard from "./PlanCard";
function ExplorePlan({ dismiss }: { dismiss: (park?: Park) => void }) {
  const [search, setSearch] = useState("");
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Plans</IonTitle>

          <IonButtons slot="secondary" collapse>
            <IonButton onClick={() => dismiss()}>Close</IonButton>
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton>Edit</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent
        color="light"
        style={{
          "--offset-top": "56px",
        }}
        fullscreen
      >
        <IonHeader collapse="condense">
          <IonToolbar color="light">
            <IonTitle size="large">Plans</IonTitle>
          </IonToolbar>
          <IonToolbar className="" color="light">
            <IonSearchbar
              value={search}
              debounce={200}
              placeholder="Search"
              showCancelButton="focus"
              className="mt-2 px-2 -mb-2"
              onIonChange={(e) => setSearch(e.detail.value!)}
              onIonClear={() => setSearch("")}
            />
          </IonToolbar>
        </IonHeader>
        {/* @ts-ignore */}
        {parkList.slice(0,1).map((park: Park) => (
          <PlanCard
            key={`plan-${park.id}`}
            park={park}
            onClick={(park) => dismiss(park)}
          />
        ))}
        <div className="py-8" />
      </IonContent>
    </>
  );
}
export default ExplorePlan;

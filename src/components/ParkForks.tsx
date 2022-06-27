import {
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";

function ParkForks() {
  return (
    <>
      <IonListHeader>
        <IonLabel>Forks</IonLabel>
        <IonButton>More</IonButton>
      </IonListHeader>
      <IonList className="!mt-0" inset>
        <IonItem detail>
          <IonLabel>Fork #1</IonLabel>
          <p>2.2 mi</p>
        </IonItem>
        <IonItem detail>
          <IonLabel>Fork #2</IonLabel>
          <p>3.5 mi</p>
        </IonItem>
      </IonList>
      <div className="pb-[30vh]" />
    </>
  );
}
export default ParkForks;

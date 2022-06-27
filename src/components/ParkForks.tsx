import {
  IonBadge,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";
import { Park } from "../../typing";

import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ParkAlertCard from "./ParkAlert";

function ParkForks({ park }: { park: Park }) {
  return (
    <>
      <IonListHeader>
        <IonLabel>Forks</IonLabel>
        <IonButton>More</IonButton>
      </IonListHeader>
      <IonList className="!mt-0" inset>
        <IonItem button detail>
          <IonLabel>Fork #1</IonLabel>
          <p>2.2 mi</p>
        </IonItem>
        <IonItem button detail>
          <IonLabel>Fork #2</IonLabel>
          <p>3.5 mi</p>
        </IonItem>
      </IonList>

      <IonListHeader className="-mb-3 flex items-center pr-4">
        <IonLabel className="m-0">Alerts in effect</IonLabel>
        <IonBadge color="secondary">{park.alerts.length}</IonBadge>
      </IonListHeader>
      <Swiper
        modules={[Pagination]}
        pagination={true}
        className="[&_.swiper-pagination-bullet]:!-mb-4"
      >
        {park.alerts.map((alert, index) => (
          <SwiperSlide key={`${alert.title}.${index}`}>
            <ParkAlertCard alert={alert} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="pb-[30vh]" />
    </>
  );
}
export default ParkForks;

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircle, location } from "ionicons/icons";
import { convertTime } from "../lib/convertTime";
import ElevationBar from "./ElevationBar";
import ParkInfoBar, { featureIcons } from "./ParkInfoBar";
import ParkWeatherBar from "./ParkWeatherBar";
import parkList from "../data/parks.json";
import { Park } from "../../typing";

import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function ParkCompareModal({ dismiss }: { dismiss: () => void }) {
  const park = parkList[0] as unknown as Park;
  const park2 = parkList[1] as unknown as Park;
  const availableFeatures = (park: Park) =>
    featureIcons
      .filter(
        // @ts-ignore
        (feature) => park.features[feature.name]
      )
      .map((feature) => (
        <div key={feature.name} className="flex items-center gap-4">
          <feature.icon className="w-4 h-4 text-dark-tint" />
          <p>{feature.label}</p>
        </div>
      ));
  return (
    <IonPage className="bg-light-default">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Compare</IonTitle>
          <IonButtons slot="end" collapse>
            <IonButton
              onClick={dismiss}
              color="medium"
              style={{ fontSize: 22, marginRight: -6, opacity: 0.7 }}
            >
              <IonIcon icon={closeCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light">
        <IonHeader collapse="condense" className="">
          <IonToolbar color="light">
            <IonTitle size="large">Compare</IonTitle>
          </IonToolbar>
          <IonToolbar color="light">
            <IonSearchbar
              value="Diablo Foothills Trail"
              showClearButton="always"
              searchIcon={location}
            />
            <IonSearchbar
              value="Mt. Diablo"
              showClearButton="always"
              searchIcon={location}
            />
            <IonSearchbar
              placeholder="Add..."
              showClearButton="always"
              searchIcon={location}
            />
          </IonToolbar>
        </IonHeader>
        <IonListHeader className="-mb-3">Operation</IonListHeader>
        <IonList className="p-4 flex flex-col gap-4" inset>
          <ParkInfoBar park={park} />
          <ParkInfoBar park={park2} />
        </IonList>
        <IonListHeader className="-mb-3">Details</IonListHeader>

        <Swiper
          modules={[Pagination]}
          pagination={true}
          className="[&_.swiper-pagination-bullet]:!-mb-4"
        >
          <SwiperSlide>
            <IonList inset>
              <IonItem>
                <IonLabel>Hours</IonLabel>
                <p>{park.info.hours}</p>
              </IonItem>
              <IonItem>
                <IonLabel>Difficulty</IonLabel>
                <p>{park.info.difficulty}</p>
              </IonItem>
              <IonItem>
                <IonLabel>Duration</IonLabel>
                <p>{convertTime(park.info.duration)}</p>
              </IonItem>
              <IonItem>
                <IonLabel slot="start">Address</IonLabel>
                <p>{park.address}</p>
              </IonItem>
            </IonList>
          </SwiperSlide>
          <SwiperSlide>
            <IonList inset>
              <IonItem>
                <IonLabel>Hours</IonLabel>
                <p>{park2.info.hours}</p>
              </IonItem>
              <IonItem>
                <IonLabel>Difficulty</IonLabel>
                <p>{park2.info.difficulty}</p>
              </IonItem>
              <IonItem>
                <IonLabel>Duration</IonLabel>
                <p>{convertTime(park2.info.duration)}</p>
              </IonItem>
              <IonItem>
                <IonLabel slot="start">Address</IonLabel>
                <p className="text-xs">{park2.address}</p>
              </IonItem>
            </IonList>
          </SwiperSlide>
        </Swiper>
        <IonListHeader className="-mb-3">Elevation</IonListHeader>
        <IonList inset>
          <ElevationBar elevation={park.elevation} />
          <ElevationBar elevation={park2.elevation} />
        </IonList>
        <IonListHeader className="-mb-3">Weather</IonListHeader>
        <IonList inset>
          <ParkWeatherBar weather={park.weather} />
          <ParkWeatherBar weather={park2.weather} />
        </IonList>
        <IonListHeader className="-mb-3">Features</IonListHeader>
        <Swiper
          modules={[Pagination]}
          pagination={true}
          className="[&_.swiper-pagination-bullet]:!-mb-4"
        >
          <SwiperSlide>
            <IonList className="p-4 w-full" inset>
              {availableFeatures(park)}
            </IonList>
          </SwiperSlide>
          <SwiperSlide>
            <IonList className="p-4 w-full" inset>
              {availableFeatures(park2)}
            </IonList>
          </SwiperSlide>
        </Swiper>
        <div className="pb-12" />
      </IonContent>
    </IonPage>
  );
}
export default ParkCompareModal;

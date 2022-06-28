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
import {
  closeCircle,
  location,
  shareOutline,
  trashBinOutline,
} from "ionicons/icons";
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
          <IonButtons slot="start" collapse>
            <IonButton onClick={dismiss}>Done</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={dismiss}>
              <IonIcon icon={shareOutline} />
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
              value={park.name}
              showClearButton="always"
              showCancelButton="always"
              cancelButtonText="Remove"
              searchIcon={location}
            />
            <IonSearchbar
              value={park2.name}
              showClearButton="always"
              showCancelButton="always"
              cancelButtonText="Remove"
              searchIcon={location}
            />
            <IonSearchbar
              placeholder="Find a trail to add..."
              showClearButton="always"
              searchIcon={location}
            />
          </IonToolbar>
        </IonHeader>
        <IonListHeader className="-mb-3">Overview</IonListHeader>
        <IonList className="px-4 pb-4 pt-2 flex flex-col gap-2" inset>
          <div>
            <span className="text-sm font-bold text-dark-tint">
              {park.name}
            </span>
            <ParkInfoBar park={park} />
          </div>
          <div>
            <span className="text-sm font-bold text-dark-tint">
              {park2.name}
            </span>
            <ParkInfoBar park={park2} />
          </div>
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
                <IonLabel>Trail</IonLabel>
                <p>{park.name}</p>
              </IonItem>
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
                <IonLabel>Trail</IonLabel>
                <p>{park2.name}</p>
              </IonItem>
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
          <div className="pt-2">
            <span className="text-sm font-bold text-dark-tint px-4">
              {park.name}
            </span>
            <ElevationBar elevation={park.elevation} />
          </div>
          <div>
            <span className="text-sm font-bold text-dark-tint px-4">
              {park2.name}
            </span>
            <ElevationBar elevation={park2.elevation} />
          </div>
        </IonList>
        <IonListHeader className="-mb-3">Weather</IonListHeader>
        <IonList inset>
          <div className="pt-2">
            <span className="text-sm font-bold text-dark-tint px-4">
              {park.name}
            </span>
            <ParkWeatherBar weather={park.weather} className="pl-2 pt-0" />
          </div>
          <div>
            <span className="text-sm font-bold text-dark-tint px-4">
              {park2.name}
            </span>
            <ParkWeatherBar weather={park2.weather} className="pl-2 pt-0" />
          </div>
        </IonList>
        <IonListHeader className="-mb-3">Features</IonListHeader>
        <Swiper
          modules={[Pagination]}
          pagination={true}
          className="[&_.swiper-pagination-bullet]:!-mb-4"
        >
          <SwiperSlide>
            <IonList className="p-4 w-full" inset>
              <p className="text-sm font-bold text-dark-tint text-left">
                {park.name}
              </p>
              {availableFeatures(park)}
            </IonList>
          </SwiperSlide>
          <SwiperSlide>
            <IonList className="p-4 w-full" inset>
              <p className="text-sm font-bold text-dark-tint text-left">
                {park2.name}
              </p>
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

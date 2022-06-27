import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, car, closeCircle, globe, link } from "ionicons/icons";
import { Park } from "../../typing";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import ParkInfoBar, { featureIcons } from "./ParkInfoBar";
import { convertTime } from "../lib/convertTime";
import ParkWeatherBar from "./ParkWeatherBar";
import ElevationBar from "./ElevationBar";

function ExploreDetail({
  park,
  dismiss,
}: {
  park: Park;
  dismiss: (park?: Park) => void;
}) {
  const swiperRef = useRef<any>(null);
  const availableFeatures = featureIcons
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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{park.name}</IonTitle>
          <IonButtons slot="end" collapse>
            <IonButton
              onClick={() => dismiss()}
              color="medium"
              style={{ fontSize: 22, marginRight: -6, opacity: 0.7 }}
            >
              <IonIcon icon={closeCircle} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light" fullscreen forceOverscroll>
        <Swiper
          modules={[Pagination]}
          pagination={true}
          className="w-full flex-1 -mt-14 [&_.swiper-pagination-bullet]:!-mb-2 [&_.swiper-pagination-bullet]:opacity-50 [&_.swiper-pagination-bullet-active]:!bg-medium-contrast [&_.swiper-pagination-bullet-active]:!opacity-75"
          onInit={(swiper) => (swiperRef.current = swiper)}
          preloadImages
          loop
        >
          {park.images.map((image, index) => (
            <SwiperSlide key={index}>
              <IonImg src={image} className="object-cover aspect-[4/3]" />
            </SwiperSlide>
          ))}
        </Swiper>
        <IonHeader collapse="condense" className="">
          <IonToolbar
            style={{
              "--background": "var(--ion-color-light)",
            }}
          >
            <IonTitle size="large" className="font-bold text-2xl pl-2 pb-0">
              {park.name}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding -mt-4">
          <div className="flex flex-col justify-between items-start mb-4">
            <p className="text-dark-tint">
              {park.distanceTo} mi • {park.location}
            </p>
          </div>
          <ParkInfoBar park={park} />
        </div>
        <IonListHeader className="-mb-3">Details</IonListHeader>
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
        <IonListHeader className="-mb-3">Elevation</IonListHeader>
        <IonList inset>
          <ElevationBar elevation={park.elevation} />
        </IonList>
        <IonListHeader className="-mb-3">Weather</IonListHeader>
        <IonList inset>
          <ParkWeatherBar weather={park.weather} />
        </IonList>
        <IonListHeader className="-mb-3">Features</IonListHeader>
        <IonList inset>
          <div className="ion-padding">{availableFeatures}</div>
        </IonList>
        <IonListHeader className="-mb-3">Trail Info</IonListHeader>
        <IonList inset>
          <div className="ion-padding">{park.description}</div>
        </IonList>
        <IonList inset>
          <IonItem button detail detailIcon={link}>
            <IonIcon icon={globe} slot="start" color="primary" />
            <IonLabel color="primary">Website</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton slot="start" color="light" className="">
            <IonIcon icon={add} />
          </IonButton>
          <IonButton slot="end" expand="block" onClick={() => dismiss(park)}>
            <IonIcon slot="start" icon={car} />
            <IonLabel slot="end">36 min</IonLabel>
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}
export default ExploreDetail;

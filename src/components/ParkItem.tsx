import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
} from "@ionic/react";
import { Park } from "../../typing";
import { Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import ParkInfoBar from "./ParkInfoBar";
import ParkOperationLabel from "./ParkOperationLabel";
import { heartOutline, shareOutline, trashOutline } from "ionicons/icons";

function ParkItem({
  park,
  onClick,
  options,
}: {
  park: Park;
  onClick: (park: Park) => void;
  options?: {
    type?: "compact" | "large";
  };
}) {
  const swiperRef = useRef<any>(null);
  const itemRef = useRef<any>(null);
  const type = options?.type || "large";
  const handleClose = () => {
    if (itemRef.current) {
      itemRef.current.close();
    }
  };
  return (
    <IonItemSliding ref={itemRef}>
      <IonItemOptions side="start" onIonSwipe={handleClose}>
        <IonItemOption onClick={handleClose} expandable>
          <IonIcon icon={heartOutline} slot="icon-only" color="light" />
        </IonItemOption>
        <IonItemOption color="secondary" onClick={handleClose}>
          <IonIcon icon={shareOutline} slot="icon-only" color="dark" />
        </IonItemOption>
      </IonItemOptions>
      <IonItem
        onClick={() => onClick(park)}
        style={{
          "--border-color": "var(--ion-color-light)",
        }}
      >
        <div className="w-full grid grid-cols-3 gap-4 py-2.5">
          <div className="col-span-2 flex flex-col py-0.5">
            <h2 className="text-lg font-semibold -mt-1">{park.name}</h2>
            <span className="text-medium-shade text-sm line-clamp-1">
              {park.distanceTo} mi • {park.location}
            </span>
            {type === "large" && (
              <>
                <hr className="my-1 border-light-shade" />
                <ParkInfoBar park={park} />
              </>
            )}
            {type === "compact" && (
              <div className="flex justify-between items-center">
                <p className="text-sm text-medium-shade flex flex-wrap gap-x-1">
                  <ParkOperationLabel operation={park.info.operation} />
                  <span>•</span>
                  <span>{park.info.hours}</span>
                </p>
              </div>
            )}
            {/* <p className="line-clamp-1 sm:line-clamp-3 text-sm">
            {park.description}
          </p> */}
          </div>
          <div className="inline-flex">
            <Swiper
              modules={[Autoplay, EffectFade]}
              className="w-full flex-1 h-full rounded-md overflow-hidden [&_.swiper-pagination-bullet]:!-mb-2 [&_.swiper-pagination-bullet]:opacity-50 [&_.swiper-pagination-bullet-active]:!bg-medium-contrast [&_.swiper-pagination-bullet-active]:!opacity-75"
              onInit={(swiper) => (swiperRef.current = swiper)}
              autoplay={{
                delay: 5000,
              }}
              effect="fade"
              allowTouchMove={false}
              loop
            >
              {park.images.map((image, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    background: `url(${image}) no-repeat center center`,
                    backgroundSize: "cover",
                  }}
                  className="no-swiping"
                />
              ))}
            </Swiper>
          </div>
        </div>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={handleClose} expandable>
          <IonIcon icon={trashOutline} slot="icon-only" color="light" />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
}
export default ParkItem;

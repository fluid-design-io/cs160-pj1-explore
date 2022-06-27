import { IonImg, IonItem, IonLabel } from "@ionic/react";
import { Park } from "../../typing";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import ParkInfoBar from "./ParkInfoBar";
import ParkOperationLabel from "./ParkOperationLabel";

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
  const type = options?.type || "large";
  return (
    <IonItem
      onClick={() => onClick(park)}
      style={{
        // "--inner-padding-end": "0px",
        // "--border-width": 0,
        "--border-color": "var(--ion-color-light)",
      }}
    >
      <div className="w-full grid grid-cols-3 gap-4 py-2">
        <div className="col-span-2 flex flex-col">
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
              <p className="text-sm text-medium-shade">
                <ParkOperationLabel operation={park.info.operation} /> •{" "}
                {park.info.hours}
              </p>
            </div>
          )}
          {/* <p className="line-clamp-1 sm:line-clamp-3 text-sm">
            {park.description}
          </p> */}
        </div>
        <div>
          <Swiper
            modules={[Pagination]}
            pagination={true}
            className="w-full flex-1 rounded-md overflow-hidden [&_.swiper-pagination-bullet]:!-mb-2 [&_.swiper-pagination-bullet]:opacity-50 [&_.swiper-pagination-bullet-active]:!bg-medium-contrast [&_.swiper-pagination-bullet-active]:!opacity-75"
            onInit={(swiper) => (swiperRef.current = swiper)}
            loop
          >
            {park.images.map((image, index) => (
              <SwiperSlide key={index}>
                <IonImg
                  src={image}
                  className="object-cover aspect-[5/3.3] sm:aspect-[2/1]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </IonItem>
  );
}
export default ParkItem;

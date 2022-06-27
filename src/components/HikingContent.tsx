import { IonHeader, IonTitle, IonToolbar, useIonPopover } from "@ionic/react";
import { Park } from "../../typing";
import { convertTime } from "../lib/convertTime";
import ParkWeatherBar from "./ParkWeatherBar";

function HikingContent({ park }: { park: Park }) {
  const [presentWeatherPopover] = useIonPopover(
    <ParkWeatherBar weather={park ? park.weather : []} />
  );
  return (
    <>
      <IonHeader collapse="condense">
        <IonToolbar
          style={{
            "--min-height": "72px",
          }}
          color="light"
        >
          <IonTitle
            size="large"
            className="text-6xl italic font-extrabold"
            color="primary"
          >
            {park && park.info.distance / 4}{" "}
            <span className="text-sm text-dark-tint font-semibold">
              mile{park && park.info.distance / 4 > 1 ? "s" : ""}
            </span>
          </IonTitle>
        </IonToolbar>
        <div className="text-primary-default p-4 pt-6">
          <div className="-mt-12 pointer-events-none">
            <div className="flex justify-between items-end">
              <div>
                <div className="font-semibold">{park?.name}</div>
                <div className="text-sm text-dark-tint">
                  Total: {park?.info.distance} mi •{" "}
                  {park &&
                    convertTime(Number((park.info.distance / 4) * 3 * 20))}{" "}
                  to hike
                </div>
              </div>
              <div
                className="pointer-events-auto"
                onClick={(e) =>
                  presentWeatherPopover({
                    event: e.nativeEvent,
                    cssClass: "[--min-width:80%]",
                  })
                }
              >
                <ParkWeatherBar
                  weather={park ? park.weather.slice(5, 6) : []}
                  className="py-0"
                />
              </div>
            </div>
          </div>
        </div>
      </IonHeader>
      <div className="px-4">
        <img
          src="/assets/hiking-demo-img.jpg"
          className="object-cover w-full rounded-xl max-h-[24rem] h-[30vh] min-h-[12rem]"
          alt="Hiking guide"
        />
      </div>
    </>
  );
}
export default HikingContent;

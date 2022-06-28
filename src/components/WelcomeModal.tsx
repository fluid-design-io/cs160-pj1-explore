import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonText,
  IonToolbar,
} from "@ionic/react";
import {
  gitCompare,
  search,
  warning,
} from "ionicons/icons";
import { useRef, useState } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useGeolocated } from "react-geolocated";

import "../theme/welcome.css";

function WelcomeModal({ dismiss }: { dismiss: () => void }) {
  const { getPosition, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    suppressLocationOnMount: true,
  });
  const swiperRef = useRef<any>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const hanldeNext = () => {
    swiperRef.current && swiperRef.current.slideNext();
  };
  const handlePermission = () => {
    if (isGeolocationEnabled) {
      dismiss();
    } else {
      getPosition();
    }
  };

  return (
    <>
      <IonContent className="welcome-wrap">
        <div className="welcome">
          <Swiper
            modules={[Pagination]}
            className="welcome-slider"
            pagination={true}
            onInit={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={async (e) => {
              const index = swiperRef.current.activeIndex;
              setSlideIndex(index);
            }}
          >
            <SwiperSlide className="slide-wrap">
              <div className="slide-content">
                <IonText>
                  <h1 className="welcome-h1">
                    Welcome to <br />{" "}
                    <span className="text-primary-default">Explore</span>
                  </h1>
                </IonText>
                <IonText>
                  <p className="welcome-p">
                    Explore is a mobile app that helps you find trails and help
                    you plan your next adventure.
                  </p>
                </IonText>
                <div
                  className="slide-img m-4"
                  style={{
                    backgroundImage: `url('/assets/hike.svg')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="slide-wrap">
              <div className="slide-content">
                <IonText>
                  <h1 className="welcome-h1">Rich Features</h1>
                </IonText>
                <IonText>
                  <p className="welcome-p"></p>
                </IonText>

                <div className="slide-text">
                  <div>
                    <div className="flex items-center row mt-8">
                      <div>
                        <IonIcon icon={search} />
                      </div>
                      <div>
                        <h3>Search</h3>
                        <p>
                          Search for trails and trails near you. With
                          difficulty, length, and ratings, you can find the
                          perfect trail for you.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center row">
                      <div>
                        <IonIcon icon={gitCompare} />
                      </div>
                      <div>
                        <h3>Comparison</h3>
                        <p>
                          Compare multiple trails based on difficulty, length,
                          and ratings. And see which one is the best for you.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center row">
                      <div>
                        <IonIcon icon={warning} />
                      </div>
                      <div>
                        <h3>Live updates</h3>
                        <p>
                          Get live updates on the trail you are on. Helps you
                          aviod danger and plans ahead.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slide-wrap">
              <div className="slide-content">
                <IonText>
                  <h1 className="welcome-h1">Permission</h1>
                </IonText>
                <IonText>
                  <p className="welcome-p">
                    Turning on your location can help you find trails near you.
                    It will also help you while your are hiking.
                  </p>
                </IonText>
                <div
                  className="slide-img w-40 mx-auto"
                  style={{
                    backgroundImage: `url('/assets/compass.svg')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </SwiperSlide>
            <div className="swiper-pagination"></div>
          </Swiper>
        </div>
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonToolbar style={{ "--background": "transparent" }}>
          {slideIndex === 2 ? (
            <>
              <IonButton
                expand="block"
                className="welcome-button"
                onClick={handlePermission}
              >
                Continue
              </IonButton>
              <IonButton onClick={dismiss} fill="clear" expand="full">
                <p className="permission text-sm">Setup Later</p>
              </IonButton>
            </>
          ) : (
            <>
              <IonButton
                expand="block"
                className="welcome-button"
                onClick={hanldeNext}
              >
                Continue
              </IonButton>
              <div className="py-6 my-1" />
            </>
          )}
        </IonToolbar>
      </IonFooter>
    </>
  );
}

export default WelcomeModal;

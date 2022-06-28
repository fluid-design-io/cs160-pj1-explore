import { useState, useRef } from "react";
import {
  IonButton,
  IonContent,
  IonLabel,
  IonModal,
  IonSearchbar,
  IonList,
  IonToolbar,
  IonHeader,
  IonListHeader,
  useIonModal,
  useIonAlert,
  IonicSafeString,
  IonAvatar,
} from "@ionic/react";
import clsxm from "../lib/clsxm";
import { showKeyboard } from "../lib/nativeCtrl";
import ExploreCategories from "./ExploreCategories";
import parkList from "../data/parks.json";
import { Park } from "../../typing";
import ParkItem from "./ParkItem";
import ExploreDetail from "./ExploreDetail";
import ExplorePlan from "./ExplorePlan";
import ParkCompareModal from "./ParkCompareModal";
import { FaUserCircle } from "react-icons/fa";
const ExploreSheetModal = ({
  onDismiss,
  isOpen,
}: {
  onDismiss: (data?: any, role?: string) => void;
  isOpen: boolean;
}) => {
  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [park, setPark] = useState(undefined as Park | undefined);
  const modal = useRef<HTMLIonModalElement>(null);
  const inputRef = useRef<HTMLIonSearchbarElement>(null);
  const contentRef = useRef<HTMLIonContentElement>(null);
  const [present] = useIonAlert();

  const isSearching = search.length > 0;

  const expandModal = () => {
    modal.current && modal.current.setCurrentBreakpoint(1);
    setIsExpanded(true);
    contentRef.current && contentRef.current.scrollToTop();
  };
  const contractModal = () => {
    modal.current && modal.current.setCurrentBreakpoint(0.25);
    setIsExpanded(false);
    contentRef.current && contentRef.current.scrollToTop();
  };
  const [presentDetailModal, dismissDetailModal] = useIonModal(ExploreDetail, {
    dismiss: (park?: Park) => handleDismissPlanModal(park),
    park,
  });
  const [presentPlanModal, dismissPlanModal] = useIonModal(ExplorePlan, {
    dismiss: (park?: Park) => handleDismissPlanModal(park),
  });
  const [presentCompareModal, dismissCompareModal] = useIonModal(
    ParkCompareModal,
    {
      dismiss: () => dismissCompareModal(),
    }
  );
  const searchFocus = async () => {
    if (inputRef.current) {
      await inputRef.current.setFocus();
      await showKeyboard();
    }
  };
  const handlePresentDetailModal = (park: Park) => {
    setPark(park);
    presentDetailModal(sheetModalConfig);
  };
  const handleDismissPlanModal = (park?: Park) => {
    if (park) {
      dismissPlanModal();
      dismissDetailModal();
      contractModal();
      onDismiss(park, "confirm");
    } else {
      dismissPlanModal();
      dismissDetailModal();
    }
  };

  const sheetModalConfig = {
    canDismiss: true,
    breakpoints: [0, 1],
    initialBreakpoint: 1,
  };
  const handleExploreCategory = (action: { type: string; query?: string }) => {
    if (action.type === "search") {
      setSearch(action.query || "");
    } else if (action.type === "plans") {
      presentPlanModal(sheetModalConfig);
    } else if (action.type === "compare") {
      presentCompareModal(sheetModalConfig);
    } else if (action.type === "nearby") {
      present({
        header: "Portion of Diablo Foothills Trail closed (in 1.5 miles)",
        message: new IonicSafeString(`
          <img src="/assets/trail-closed-demo.jpg" width="100%" style="object-fit:cover;border-radius:6px;margin-bottom:0.5rem;" />
          <p style="text-align:left">
          Part of the Diablo Foothills Trail starting from the stairs at Sand Bench will be closed for repairs 6 am to 4:30 pm Mondays through Thursdays until further notice. Other sections remain open.
          </p>
        `),
        buttons: [
          "Dismiss",
          { text: "View", handler: (d) => console.log("ok pressed") },
        ],
        onDidDismiss: (e) => console.log("did dismiss"),
      });
    }
  };
  return (
    <IonModal
      ref={modal}
      isOpen={isOpen}
      canDismiss={false}
      initialBreakpoint={0.25}
      backdropBreakpoint={0.5}
      breakpoints={[0.25, 0.5, 1]}
      onIonBreakpointDidChange={(bp) => {
        if (bp.detail.breakpoint === 1) {
          setIsExpanded(true);
        } else {
          setIsExpanded(false);
        }
      }}
    >
      <IonHeader className="">
        <IonToolbar className="relative ion-no-padding">
          <div
            className={clsxm(
              "absolute top-1.5 left-0 bottom-1.5 right-12 z-10",
              isExpanded && "hidden"
            )}
            onClick={() => {
              expandModal();
              setTimeout(() => {
                searchFocus();
              }, 350);
            }}
          />
          <div className="flex gap-1.5 items-center">
            <IonSearchbar
              ref={inputRef}
              value={search}
              debounce={200}
              placeholder="Search"
              showCancelButton="focus"
              className="mt-2 px-2 -mb-2"
              onIonCancel={contractModal}
              onIonChange={(e) => setSearch(e.detail.value!)}
              onIonClear={() => setSearch("")}
              inputMode="search"
            />
            <IonAvatar
              className={clsxm(
                "flex-shrink-0 w-9 h-9 mr-1",
                isExpanded && "hidden"
              )}
              onClick={() => null}
            >
              <FaUserCircle className="text-primary-default w-9 h-9" />
            </IonAvatar>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent ref={contentRef} color="light" scrollEvents>
        <ExploreCategories
          className={clsxm(isSearching && "hidden")}
          onClick={handleExploreCategory}
        />
        <IonList className={clsxm("!m-0", isSearching && "hidden")} inset>
          <IonListHeader className="-mt-3" color="light">
            <IonLabel>Recent</IonLabel>
            <IonButton>More</IonButton>
          </IonListHeader>
        </IonList>
        <IonList className={clsxm("!-mb-2", isSearching && "hidden")} inset>
          {/* @ts-ignore */}
          {parkList.slice(1, 3).map((park: Park) => (
            <ParkItem
              key={park.id}
              park={park}
              onClick={handlePresentDetailModal}
              options={{
                type: "compact",
              }}
            />
          ))}
        </IonList>
        <IonListHeader className={clsxm("-mb-3", isSearching && "hidden")}>
          <IonLabel>My Plans</IonLabel>
          <IonButton>More</IonButton>
        </IonListHeader>
        <IonList className={clsxm(isSearching && "hidden")} inset>
          {/* @ts-ignore */}
          {parkList.slice(0, 1).map((park: Park) => (
            <ParkItem
              key={`my.plans.${park.id}`}
              park={park}
              onClick={handlePresentDetailModal}
              options={{
                type: "compact",
              }}
            />
          ))}
        </IonList>
        <IonListHeader className={clsxm("-mb-3", !isSearching && "hidden")}>
          <IonLabel>Results</IonLabel>
        </IonListHeader>
        <IonList className={clsxm(!isSearching && "hidden")} inset>
          {parkList
            .filter((park) =>
              park.name.toLowerCase().includes(search.toLowerCase())
            )
            /* @ts-ignore */
            .map((park: Park) => (
              <ParkItem
                key={`my.plans.${park.id}`}
                park={park}
                onClick={handlePresentDetailModal}
                options={{
                  type: "compact",
                }}
              />
            ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};
export default ExploreSheetModal;

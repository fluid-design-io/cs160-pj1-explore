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
        header: "Portion of Diablo Foothills Trail closed",
        message: new IonicSafeString(`
          <img src="/assets/trail-closed-demo.jpg" width="100%" style="object-fit:cover;border-radius:8px;margin-bottom:0.5rem;" />
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
            className={clsxm("absolute inset-0 z-10", isExpanded && "hidden")}
            onClick={() => {
              expandModal();
              setTimeout(() => {
                searchFocus();
              }, 100);
            }}
          />
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
          />
        </IonToolbar>
      </IonHeader>
      <IonContent ref={contentRef} color="light" scrollEvents>
        <ExploreCategories
          className={clsxm(search.length > 0 && "opacity-0")}
          onClick={handleExploreCategory}
        />
        <IonList className="!m-0" inset>
          <IonListHeader className="-mt-3" color="light">
            <IonLabel>Recent</IonLabel>
            <IonButton>More</IonButton>
          </IonListHeader>
        </IonList>
        <IonList className="!mt-0" inset>
          {/* @ts-ignore */}
          {parkList.map((park: Park) => (
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
      </IonContent>
    </IonModal>
  );
};
export default ExploreSheetModal;

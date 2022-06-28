import { IonChip, IonIcon, IonLabel } from "@ionic/react";
import { gitCompare, leaf, locate, pin } from "ionicons/icons";
import clsxm from "../lib/clsxm";

const list = [
  {
    name: "My Plans",
    action: {
      type: "plans",
    },
    icon: pin,
    color: "dark",
  },
  {
    name: "Compare",
    action: {
      type: "compare",
    },
    icon: gitCompare,
    color: "dark",
  },
  {
    name: "Nearby",
    action: {
      type: "nearby",
    },
    icon: locate,
    color: "dark",
  },
  {
    name: "Mountains",
    action: {
      type: "search",
      query: "mountains",
    },
    icon: leaf,
    color: "dark",
  },
  {
    name: "Forests",
    action: {
      type: "search",
      query: "forests",
    },
    icon: leaf,
    color: "dark",
  },
];

function ExploreCategories({
  onClick,
  ...props
}: {
  onClick: (action: { type: string; query?: string }) => void;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsxm(
        "flex  max-w-full overflow-y-hidden overflow-x-auto transition-opacity pt-2",
        props.className
      )}
    >
      {list.map(({ name, icon, color, action }) => (
        <IonChip
          key={`chip-${name}`}
          className={clsxm("min-w-[6rem] flex-shrink-0 rounded-md [&:first-child]:ml-4 [&:last-child]:mr-4 mx-2",
            name === "My Plans" && "bg-primary-tint",
            name === "Compare" && "bg-secondary-tint",
          )}
          color={color}
          onClick={() => onClick(action)}
        >
          <IonIcon icon={icon} />
          <IonLabel className="font-semibold">{name}</IonLabel>
        </IonChip>
      ))}
    </div>
  );
}
export default ExploreCategories;

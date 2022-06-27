import { Park } from "../../typing";
import {
  MdBathroom,
  MdChildFriendly,
  MdLocalParking,
  MdOutlineAccessibleForward,
  MdOutlineWaterDrop,
  MdPets,
  MdWifi,
} from "react-icons/md";

import { FaRestroom } from "react-icons/fa";
import ParkOperationLabel from "./ParkOperationLabel";

export const featureIcons = [
  {
    name: "accessibility",
    label: "Wheelchair Access",
    icon: MdOutlineAccessibleForward,
  },
  {
    name: "parking",
    label: "Parking",
    icon: MdLocalParking,
  },
  {
    name: "wifi",
    label: "WiFi",
    icon: MdWifi,
  },
  {
    name: "kids",
    label: "Good for Kids",
    icon: MdChildFriendly,
  },
  { name: "drinkingWater", label: "Drinking Water", icon: MdOutlineWaterDrop },
  { name: "dogFriendly", label: "Dog Friendly", icon: MdPets },
  { name: "restrooms", label: "Gender-Neutral Restrooms", icon: FaRestroom },
];

const InfoItem = ({
  label,
  value,
  Component,
}: {
  label: string;
  value?: string | number;
  Component?: JSX.Element;
}) => {
  return (
    <div className="flex items-start justify-between flex-grow flex-col px-2 flex-shrink-0">
      <div className="uppercase text-xs text-medium-default font-rounded font-bold">
        {label}
      </div>
      {value && <div className="text-dark-tint font-semibold">{value}</div>}
      {Component && Component}
    </div>
  );
};

function ParkInfoBar({ park }: { park: Park }) {
  const availableFeatures = featureIcons
    .filter(
      // @ts-ignore
      (feature) => park.features[feature.name]
    )
    .map((feature) => (
      <div key={feature.name} className="flex items-center">
        <feature.icon className="w-4 h-4 text-dark-tint" />
      </div>
    ));
  return (
    <div className="flex justify-start items-end divide-x divide-light-shade flex-1 [&_div:first-child]:pl-0 w-full max-w-full overflow-x-auto">
      <InfoItem
        label="Hours"
        Component={<ParkOperationLabel operation={park.info.operation} />}
      />
      <InfoItem label="Length" value={`${park.info.distance} mi`} />
      <InfoItem label="Ratings" value={park.info.ratings} />
      <InfoItem
        label="Features"
        Component={
          <div className="flex justify-between items-center gap-1 my-1">
            {availableFeatures}
          </div>
        }
      />
    </div>
  );
}
export default ParkInfoBar;

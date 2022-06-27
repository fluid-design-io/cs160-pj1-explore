import { ParkInfo } from "../../typing";

function ParkOperationLabel({
  operation,
}: {
  operation: ParkInfo["operation"];
}) {
  if (operation.toLowerCase() === "open") {
    return <span className="text-success-shade font-semibold">Open</span>;
  } else {
    return <span className="text-danger-default font-semibold">Closed</span>;
  }
}
export default ParkOperationLabel;

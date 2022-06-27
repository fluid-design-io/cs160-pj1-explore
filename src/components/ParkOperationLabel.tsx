import { ParkInfo } from "../../typing";

function ParkOperationLabel({
  operation,
}: {
  operation: ParkInfo["operation"];
}) {
  const op = operation.toLowerCase();
  switch (op) {
    case "open":
      return <span className="text-success-shade font-semibold">Open</span>;
    case "closed":
      return <span className="text-danger-shade font-semibold">Closed</span>;
    case "closing":
      return <span className="text-warning-shade font-semibold">Closing</span>;
    case "reservation required":
      return (
        <span className="text-warning-shade font-semibold">
          Reservation Required
        </span>
      );
    default:
      return <span className="text-medium-shade font-semibold">{op}</span>;
  }
}
export default ParkOperationLabel;

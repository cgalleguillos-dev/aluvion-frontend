import { Pin } from "@/config/interfaces";

interface PinRowProps {
  keyPin: number;
  pin: Pin;
}

const PinRow: React.FC<PinRowProps> = ({ keyPin, pin }) => {
  return (
    <tr key={keyPin}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-gray-400">
          {pin.comunicationType}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-gray-400">
          {pin.signalType}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-gray-400">
          {pin.pinNumber}
        </div>
      </td>
    </tr>
  );
};

export default PinRow;
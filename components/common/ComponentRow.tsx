import { Component, Pin } from "@/config/interfaces";
import PinRow from "./PinRow";

interface ComponentRowProps {
  component: Component;
  index: number;
  expandedComponents: number[];
}

const ComponentRow: React.FC<ComponentRowProps> = ({
  component,
  index,
  expandedComponents,
}) => {
  return (
    <tr key={index}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-gray-400">
          {component.description}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {expandedComponents.includes(index) && (
          <div className="mt-2">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Comunication Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Signal Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Pin Number
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {component.pins.map((pin, pinIndex) => (
                  <PinRow keyPin={pinIndex} pin={pin} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ComponentRow;
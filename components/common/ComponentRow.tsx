import { Arduino, Component, Pin } from "@/config/interfaces";
import PinRow from "./PinRow";

interface ComponentRowProps {
  arduino: Arduino;
  index: number;
  expandedArduinos: number[];
}

const ComponentRow: React.FC<ComponentRowProps> = ({
  arduino,
  index,
  expandedArduinos,
}) => {
  return (
    <tr key={index}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-gray-400">
          {arduino.description}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {expandedArduinos.includes(index) && (
          <div className="mt-2">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Component
                  </th>
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
                {
                  arduino.components.map((component, index) => {
                    return (
                      <>
                        {
                          component.pins.map((pin, pinIndex) => {
                            return (
                              <PinRow keyPin={pinIndex} pin={pin} componentDescription={component.description} />
                            )
                          })
                        }
                      </>
                    )
                  })
                }
                {/* {arduino.pins.map((pin, pinIndex) => (
                  <PinRow keyPin={pinIndex} pin={pin} />
                ))} */}
              </tbody>
            </table>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ComponentRow;
import { Arduino } from "@/config/interfaces";

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

      {expandedArduinos.includes(index) && (
        <div className="mt-2">
          <div className="grid grid-cols-1 gap-4 bg-white dark:bg-gray-900">
            {
              arduino.components.map((component, index) => {
                return (
                  <>
                    <div key={index} className="p-4 bg-gray-200 rounded-lg dark:bg-gray-700">
                      <div className="text-sm text-gray-900 dark:text-gray-400">
                        {component.description}
                      </div>
                    </div>
                  </>
                )
              })
            }
            {
              arduino.composeComponents?.map((component, index) => {
                return (
                  <>
                    <div key={index} className="p-4 bg-gray-200 rounded-lg dark:bg-gray-700">
                      <div className="text-sm text-gray-900 dark:text-gray-400">
                        {component.description}
                      </div>
                    </div>

                  </>
                )
              })
            }
          </div>
        </div>
      )}

    </tr>
  );
};

export default ComponentRow;
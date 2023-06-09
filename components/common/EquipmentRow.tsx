import { BaseEquipment } from "@/config/interfaces";
import ComponentRow from "./ComponentRow";

interface EquipmentRowProps {
  equipment: BaseEquipment;
  index: number;
  expandedComponents: number[];
  toggleExpandedComponent: (index: number) => void;
}

const EquipmentRow: React.FC<EquipmentRowProps> = ({
  equipment,
  index,
  expandedComponents,
  toggleExpandedComponent,
}) => {
  return (
    <tr key={index}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-gray-400">{equipment.description}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-gray-400">
          Componentes: {equipment.components?.length}{" "}
          {expandedComponents.includes(index) ? (
            <button
              className="text-blue-500 hover:underline"
              onClick={() => toggleExpandedComponent(index)}
            >
              (ver menos)
            </button>
          ) : (
            <button
              className="text-blue-500 hover:underline"
              onClick={() => toggleExpandedComponent(index)}
            >
              (ver más)
            </button>
          )}
        </div>
        {expandedComponents.includes(index) && (
          <div className="mt-2">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {equipment.components?.map((component, componentIndex) => (
                  <ComponentRow
                    key={componentIndex}
                    component={component}
                    index={index}
                    expandedComponents={expandedComponents}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </td>
    </tr>
  );
};

export default EquipmentRow;
'use client';
import { BaseEquipment } from "@/config/interfaces";
import { useState } from "react";
import EquipmentRow from "./EquipmentRow";

interface ShowEquipmentsTableProps {
  equipments: BaseEquipment[];
}

const ShowEquipmentsTable: React.FC<ShowEquipmentsTableProps> = ({ equipments }) => {
  const [expandedComponents, setExpandedComponents] = useState<number[]>([]);

  const toggleExpandedComponent = (index: number) => {
    if (expandedComponents.includes(index)) {
      setExpandedComponents(expandedComponents.filter((item) => item !== index));
    } else {
      setExpandedComponents([...expandedComponents, index]);
    }
  };

  return (

    <div className="flex flex-col mt-4">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 dark:border-gray-700 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Components
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {equipments.map((equipment, index) => (
                  <EquipmentRow
                    key={index}
                    equipment={equipment}
                    index={index}
                    expandedComponents={expandedComponents}
                    toggleExpandedComponent={toggleExpandedComponent}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowEquipmentsTable;
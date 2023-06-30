'use client';
import { BaseEquipment } from "@/config/interfaces";
import { useState } from "react";
import EquipmentRow from "./EquipmentRow";

interface ShowEquipmentsTableProps {
  equipments: BaseEquipment[];
}

const ShowEquipmentsTable: React.FC<ShowEquipmentsTableProps> = ({ equipments }) => {
  const [expandedArduinos, setExpandedArduinos] = useState<number[]>([]);

  const toggleExpandedArduino = (index: number) => {
    if (expandedArduinos.includes(index)) {
      setExpandedArduinos(expandedArduinos.filter((item) => item !== index));
    } else {
      setExpandedArduinos([...expandedArduinos, index]);
    }
  };

  return (
    <div className="w-screen h-screen mx-10 mt-4">
      <div className="sm:-mx-6 lg:-mx-10">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow dark:border-gray-700 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Descripción
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
                  >
                    Arduinos
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                {equipments.map((equipment, index) => (
                  <EquipmentRow
                    key={index}
                    equipment={equipment}
                    index={index}
                    expandedArduinos={expandedArduinos}
                    toggleExpandedArduino={toggleExpandedArduino}
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
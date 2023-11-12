import { Equipment } from '@/config/interfaces';
import React from 'react';

interface Props {
  equipments: Equipment[];
  selectedEquipment: Equipment;
  setSelectedEquipment: (equipment: Equipment) => void;
}

export const EquipmentsHeaderView: React.FC<Props> = ({ equipments, selectedEquipment, setSelectedEquipment }) => {
  const handleSelectEquipment = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
  };

  return (
    <div>
      <ul className='flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'>
        {
          equipments.map((equipment, index) => (
            <li key={index} className={`flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400
              ${index === 0 ? 'border-l border-gray-200 dark:border-gray-700' : ''}
              ${selectedEquipment?.id === equipment.id ? 'bg-gray-300 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
              inline-block p-4 rounded-t-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800`}
              onClick={() => handleSelectEquipment(equipment)}
            >
              <span>{equipment.description}</span>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

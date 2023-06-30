'use client';
import { BaseEquipment, Equipment } from "@/config/interfaces";
import { createContext, useContext, useState } from "react";

type EquipmentContextType = {
  equipments: Equipment[];
  setEquipments: (equipments: Equipment[]) => void;
  baseEquipments: BaseEquipment[];
  setBaseEquipments: (equipments: BaseEquipment[]) => void;
  numberTotalEquipments: number;
  setNumberTotalEquipments: (numberTotalEquipments: number) => void;
  selectedEquipment: Equipment | undefined;
  setSelectedEquipment: (equipment: Equipment) => void;
  filteredEquipments: Equipment[];
  setFilteredEquipments: (equipments: Equipment[]) => void;
  baseEquipmentSelected: BaseEquipment;
  setBaseEquipmentSelected: (baseEquipment: BaseEquipment) => void;
  baseEquipmentSelectedId: string;
  setBaseEquipmentSelectedId: (baseEquipmentId: string) => void;

}

export const EquipmentContext = createContext<EquipmentContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const EquipmentContextProvider: React.FC<Props> = ({ children }) => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [baseEquipments, setBaseEquipments] = useState<BaseEquipment[]>([]);
  const [numberTotalEquipments, setNumberTotalEquipments] = useState<number>(0);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment>({} as Equipment);
  const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([]);
  const [baseEquipmentSelected, setBaseEquipmentSelected] = useState<BaseEquipment>(baseEquipments[0]!);
  const [baseEquipmentSelectedId, setBaseEquipmentSelectedId] = useState<string>('');

  return (
    <EquipmentContext.Provider value={{
      equipments,
      setEquipments,
      baseEquipments,
      setBaseEquipments,
      numberTotalEquipments,
      setNumberTotalEquipments,
      selectedEquipment,
      setSelectedEquipment,
      filteredEquipments,
      setFilteredEquipments,
      baseEquipmentSelected,
      setBaseEquipmentSelected,
      baseEquipmentSelectedId,
      setBaseEquipmentSelectedId

    }}>
      {children}
    </EquipmentContext.Provider>
  )
};

export const useEquipmentContext = (): EquipmentContextType => {
  const context = useContext(EquipmentContext);
  if (!context) {
    throw new Error('useEquipmentContext must be used within a EquipmentContextProvider');
  }
  return context;
};
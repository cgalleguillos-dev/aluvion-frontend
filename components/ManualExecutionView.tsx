'use client';
import { ComposeComponent, Equipment, ResponseComposeComponent, Simulation } from '@/config/interfaces';
import React from 'react';
import { BaseNavbar } from './BaseNavbar';
import { EquipmentsHeaderView } from './EquipmentsHeaderView';
import { ValveTableView } from './ValveTableView';
import { useSimulationFetch } from '@/hooks';

interface Props {
  equipments: Equipment[];
}

export const ManualExecutionView: React.FC<Props> = ({ equipments }) => {
  const [selectedEquipment, setSelectedEquipment] = React.useState<Equipment>(equipments[0]);
  const [selectedComposeComponent, setSelectedComposeComponent] = React.useState<ComposeComponent>();
  const [intensity, setIntensity] = React.useState<number>(0);

  const { executeManualSimulation, loading } = useSimulationFetch();

  const handleExecuteSimulation = async () => {
    if (!selectedComposeComponent) return;
    const manualSimulation = {
      idArduino: selectedComposeComponent?.arduino.id,
      idComposeComponent: selectedComposeComponent?.id,
      position: intensity
    }
    const response = await executeManualSimulation(manualSimulation);
    // const outputExecutionAux = await executeSimulation(simulation.id);
  }
  return (
    <div className='w-screen h-screen'>
      <BaseNavbar title='Ejecución Manual' isPage>
        <button className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
          onClick={() => handleExecuteSimulation()}
        >
          Ejecutar
        </button>

      </BaseNavbar>
      <EquipmentsHeaderView equipments={equipments}
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
      />

      {/* #haz un seleccionable de los composeComponents del equipo seleccionado , una lista donde pueda seleccionar una valvula*/}
      {
        selectedEquipment && (
          <div className="">
            <ul className="flex flex-row justify-center bg-gray-200 ">
              {
                selectedEquipment.composeComponents.map((composeComponent, index) => (
                  <li key={index} className="flex flex-col items-center justify-center w-1/3 border-2 border-gray-400 rounded-lg cursor-pointer h-1/3 hover:bg-gray-300 "
                    onClick={() => setSelectedComposeComponent(composeComponent)}

                  >
                    {composeComponent.description}
                  </li>
                ))
              }
            </ul>
          </div>

        )
      }
      {
        selectedComposeComponent && (
          //debe ser un input de tipo range, que vaya de 0 a 10
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center w-1/2 rounded-lg h-1/2">
              <div className="flex flex-col items-center justify-center w-1/2">
                <label htmlFor="valve" className="block text-sm font-medium text-gray-700 dark:text-white">
                  Apertura
                </label>
                <input type="range"
                  min="0"
                  max="10"
                  name="valve" id="valve"
                  value={intensity}
                  className="w-1/2 h-1/2"
                  onChange={(e) => setIntensity(parseInt(e.target.value))}
                />
              </div>
              <div className="flex flex-row items-center justify-center text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400 ">{
                intensity
              }</div>
            </div>

          </div>
        )
      }
    </div>
  );
};

'use client';
import React, { useState } from 'react'
import { CustomButton } from './common'
import { useShowPopup, useSimulationFetch } from '@/hooks';
import Loading from './common/Loading';
import { ComposeComponent, Equipment } from '@/config/interfaces';
import { IEventValves } from '@/config/interfaces';
import { ValveTable } from './ValveTable';
import { ValveTimeLine } from './ValveTimeLine';


interface SimulationData {
  description: string;
  equipmentId: string;
  date?: Date;
  events: IEventValves[];
}

interface Props {
  equipments: Equipment[];
}

export const NewSimulationForm: React.FC<Props> = ({ equipments }) => {
  const [description, setDescription] = useState<string>("")
  const [equipmentSelectedId, setEquipmentSelectedId] = useState<string>("")
  const [equipmentSelected, setEquipmentSelected] = useState<Equipment>();
  const [valvesSelected, setValvesSelected] = useState<ComposeComponent[]>([]);
  const [valves, setValves] = useState<IEventValves[]>([{ valveId: '', valve: '', intensity: '0', time: '0' }]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { showPopup, handleShowPopup, handleHidePopup } = useShowPopup();
  const { saveSimulation, loading } = useSimulationFetch();

  const getFilteredValvesByComponent = (composeComponent: ComposeComponent) => {
    const filteredValves = [...valves].filter((valve) => composeComponent.id === valve.valveId);
    return filteredValves;
  }

  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  }

  const handleSaveSimulation = () => {
    const simulationData: SimulationData = {
      description,
      equipmentId: equipmentSelectedId,
      events: valves
    }
    saveSimulation(simulationData);
    handleHidePopup();
  }

  const handleEquipmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    if (e.target.value === '') {
      setEquipmentSelectedId('');
      setEquipmentSelected(undefined);
      restartValves();
      return;
    }
    const selectedId = e.target.value;
    setEquipmentSelectedId(selectedId);
    setEquipmentSelected(equipments.find((equipment) => equipment.id === selectedId)!);
    if (equipmentSelected?.composeComponents.length === 0) return;
    setValvesSelected(equipments.find((equipment) => equipment.id === selectedId)!.composeComponents);
    restartValves();
  }

  const updateValveTable = (index: number, field: keyof IEventValves, value: string) => {
    const newValues = [...valves];
    newValues[index][field] = value;
    setValves(newValues);
  };

  const addRow = () => {
    setValves([...valves, { valveId: '', valve: '', intensity: '0', time: '0' }]);
  }

  const removeRow = (index: number) => {
    const newValues = [...valves];
    newValues.splice(index, 1);
    setValves(newValues);
  }

  const removeLastRow = () => {
    const newValues = [...valves];
    newValues.pop();
    setValves(newValues);
  }

  const restartValves = () => {
    setValves([{ valveId: '', valve: '', intensity: '0', time: '0' }]);
  }

  const enableAddButton = () => {
    //el boton sepuede habilitar si, hay descripción, y si hay al menos una válvula seleccionada y con intensidad y tiempo
    if (description === '') return false;
    if (equipmentSelected?.composeComponents.length === 0) return false;
    if (valves.length === 0) return false;
    const valvesSelected = valves.filter((valve) => valve.valve !== '');
    if (valvesSelected.length === 0) return false;
    const valvesWithTime = valvesSelected.filter((valve) => valve.time !== '0');
    if (valvesWithTime.length === 0) return false;
    return true;
  }
  return (
    <>
      <CustomButton
        description="Agregar Simulación"
        onClick={handleShowPopup}
      />
      {
        showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
            <div className="flex flex-row w-3/4 p-4 mt-4 bg-white rounded-lg h-3/4 sm:mx-auto">
              <div className="w-3/4 h-full overflow-x-auto">
                <div className="inline-block h-full min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="h-full overflow-hidden border-b border-gray-200 shadow dark:border-gray-700 sm:rounded-lg">
                    <div className="p-4 space-y-4">
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700 dark:text-white"
                        >
                          Descripción
                        </label>
                        <input
                          id="description"
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          className="block w-full px-3 py-2 mt-1 text-sm text-gray-900 bg-gray-400 bg-opacity-25 border-gray-300 rounded-lg dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="equipment"
                          className="block text-sm font-medium text-gray-700 dark:text-white"
                        >
                          Equipo
                        </label>
                        <select
                          id="equipment"
                          value={equipmentSelectedId!}
                          onChange={handleEquipmentChange}
                          className="block w-full px-3 py-2 mt-1 text-sm text-gray-900 bg-gray-400 bg-opacity-25 border-gray-300 rounded-lg dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value={""}>Selecionar equipo</option>
                          {equipments!.map((equipment, index) => (
                            <option key={index} value={equipment.id}>{equipment.description}</option>
                          ))}
                        </select>
                      </div>
                      {
                        equipmentSelected && (
                          <div className="">
                            <ValveTable
                              valvesSelected={valvesSelected}
                              valves={valves}
                              isEditing={isEditing}
                              removeRow={removeRow}
                              updateValveTable={updateValveTable}
                            />
                          </div>
                        )
                      }
                      <div className="flex flex-row justify-between">
                        <CustomButton
                          description="Cerrar"
                          onClick={handleHidePopup}
                          color="red"
                        />
                        <CustomButton
                          description="Agregar"
                          onClick={handleSaveSimulation}
                          color="blue"
                          enabled={enableAddButton()}
                        />
                        <div className="space-x-4">
                          <CustomButton
                            description="+"
                            onClick={addRow}
                            color="blue"
                            enabled={true}
                          />
                          <CustomButton
                            description='-'
                            onClick={removeLastRow}
                            color="blue"
                            enabled={true}
                          />
                          <CustomButton
                            description={!isEditing ? "Editar" : "Guardar"}
                            onClick={handleIsEditing}
                            color="blue"
                            enabled={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {
                equipmentSelected && (<>
                  <div className="flex flex-col items-center justify-center w-1/4 h-full p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:mx-auto">
                    {
                      equipmentSelected.composeComponents.map((composeComponent, index) => (

                        <ValveTimeLine
                          key={index}
                          valves={getFilteredValvesByComponent(composeComponent)}
                          title={composeComponent.description + '-' + index}
                        />
                      )
                      )
                    }
                  </div>
                </>)
              }
            </div>
          </div>
        )
      }
      {
        loading && <Loading />
      }


    </>
  )
}

'use client';
import React, { useState } from 'react'
import { CustomButton, CustomCloseButton } from './common'
import { useShowPopup, useSimulationFetch } from '@/hooks';
import Loading from './common/Loading';
import { ComposeComponent, Equipment } from '@/config/interfaces';
import { IEventValves } from '@/config/interfaces';
import { ValveTable } from './ValveTable';
import { ValveTimeLine } from './ValveTimeLine';
import { ValvesHeader } from './ValvesHeader';
import { useRouter } from 'next/navigation';

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
  const [valveSelected, setValveSelected] = useState<ComposeComponent>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { showPopup, handleShowPopup, handleHidePopup } = useShowPopup();
  const { saveSimulation, loading } = useSimulationFetch();
  const router = useRouter();
  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  }

  const addEmptyEventToValve = () => {
    const valveCopy = { ...valveSelected! };
    const lastEvent = valveCopy.events![valveCopy.events!.length - 1];
    const newStartTime = lastEvent ? lastEvent.endTime : '0';
    valveCopy.events?.push({
      valveId: valveSelected!.id,
      valve: valveSelected!.description,
      intensity: '0',
      startTime: newStartTime,
      endTime: newStartTime
    });
    setValveSelected(valveCopy);
  }

  const removeLastEventFromValve = () => {
    if (valveSelected?.events?.length === 0) return;
    const valveCopy = { ...valveSelected! };
    valveCopy.events?.pop();
    setValveSelected(valveCopy);
  }

  const removeEventWithIndexFromValve = (index: number) => {
    const valveCopy = { ...valveSelected! };
    valveCopy.events?.splice(index, 1);
    setValveSelected(valveCopy);
  }

  const updateValveEvent = (index: number, field: keyof IEventValves, value: string) => {
    const valveCopy = { ...valveSelected! };
    valveCopy.events![index][field] = value;
    setValveSelected(valveCopy);
  };

  const handleSaveSimulation = async () => {
    const events: IEventValves[] = [];
    valvesSelected.forEach((valve) => {
      if (valve.events !== undefined) {
        events.push(...valve.events);
      }
    });
    const simulationData: SimulationData = {
      description,
      equipmentId: equipmentSelectedId,
      events: events
    }
    const newSim = await saveSimulation(simulationData);

    //refresh
    router.refresh();
    handleHidePopup();
  }

  const handleEquipmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    if (e.target.value === '') {
      setEquipmentSelectedId('');
      setEquipmentSelected(undefined);
      // restartValves();
      return;
    }
    const selectedId = e.target.value;
    setEquipmentSelectedId(selectedId);
    setEquipmentSelected(equipments.find((equipment) => equipment.id === selectedId)!);
    if (equipmentSelected?.composeComponents.length === 0) return;
    setValvesSelected(equipments.find((equipment) => equipment.id === selectedId)!.composeComponents);
    // restartValves();
  }

  const enableActionButton = () => {
    return valveSelected !== undefined;
  }

  const enableAddButton = () => {
    return valveSelected !== undefined && valveSelected.events !== undefined;
  }

  return (
    <>
      <CustomButton
        description="Agregar Simulación"
        onClick={handleShowPopup}
        enabled={true}
      />
      {
        showPopup && (
          <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
            <div className="flex flex-row w-3/4 p-4 mt-4 bg-white rounded-lg h-3/4 sm:mx-auto">
              <div className="w-3/4 h-full overflow-x-auto">
                <div className="inline-block h-full min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="h-full overflow-hidden border-b border-gray-200 shadow dark:border-gray-700 sm:rounded-lg">
                    <div className="flex flex-row justify-end">
                      <CustomCloseButton handleHidePopup={handleHidePopup} />
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="flex flex-row justify-between">
                        <h4 className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-400"
                        >Añadir nueva simulación</h4>
                      </div>

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
                            <ValvesHeader
                              valves={valvesSelected}
                              selectedValve={valveSelected!}
                              setValveSelected={setValveSelected}
                            />
                            {
                              valveSelected && (
                                <ValveTable
                                  valveSelected={valveSelected!}
                                  isEditing={isEditing}
                                  updateValveEvent={updateValveEvent}
                                  removeEventWithIndexFromValve={removeEventWithIndexFromValve}
                                />
                              )
                            }
                          </div>
                        )
                      }
                      <div className="flex flex-row justify-between">
                        <CustomButton
                          description="Agregar"
                          onClick={handleSaveSimulation}
                          color="blue"
                          enabled={enableAddButton()}
                        />
                        <div className="space-x-4">
                          <CustomButton
                            description="+"
                            onClick={addEmptyEventToValve}
                            color="blue"
                            enabled={enableActionButton()}
                          />
                          <CustomButton
                            description='-'
                            onClick={removeLastEventFromValve}
                            color="blue"
                            enabled={enableActionButton()}
                          />
                          <CustomButton
                            description={!isEditing ? "Editar" : "Guardar"}
                            onClick={handleIsEditing}
                            color="blue"
                            enabled={enableActionButton()}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {
                equipmentSelected && valveSelected && (<>
                  <div className="flex flex-col items-center justify-center w-1/4 h-full p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:mx-auto">
                    {
                      <ValveTimeLine
                        valves={valveSelected.events!}
                        title={valveSelected.description}
                      />
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

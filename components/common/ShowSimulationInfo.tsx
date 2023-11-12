'use client';
import { ResponseComposeComponent, Simulation } from '@/config/interfaces'
import React from 'react'
import Loading from './Loading';
import { CustomCloseButton } from './CustomCloseButton';
import { ValveTableView } from '../ValveTableView';
import { ValvesHeaderView } from '../ValvesHeaderView';
import { ValveTimeLine } from '../ValveTimeLine';

interface Props {
  simulation: Simulation;
  handleHideForm: () => void;
  loading?: boolean;
}

export const ShowSimulationInfo: React.FC<Props> = ({
  simulation,
  handleHideForm,
  loading
}) => {
  const [valveSelected, setValveSelected] = React.useState<ResponseComposeComponent>();
  //filtra los eventos de la simulación con los composeComponents,comparando el id del componente con el id del composeComponent del evento, y almacena cada evento en el composeComponent correspondiente
  const filterEvents = () => {
    //inicializa los eventos de cada composeComponent
    simulation.equipment.composeComponents.forEach(component => {
      component.events = [];
    })

    simulation.eventList.forEach(event => {
      simulation.equipment.composeComponents.forEach(component => {
        if (event.composeComponent.id === component.id) {

          component.events?.push(event);
        }
      })
    });

  }

  React.useEffect(() => {
    filterEvents();
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
      <div className="flex flex-row w-3/4 p-4 mt-4 bg-white rounded-lg h-3/4 sm:mx-auto">
        <div className="w-3/4 h-full overflow-x-auto">
          <div className="inline-block h-full min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="h-full overflow-hidden border-b border-gray-200 shadow dark:border-gray-700 sm:rounded-lg">
              <div className="flex flex-row justify-end">
                <CustomCloseButton handleHidePopup={handleHideForm} />
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label
                    htmlFor="equipment"
                    className="block text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Equipo
                  </label>
                  <div className="block w-full px-3 py-2 mt-1 text-sm text-gray-900 bg-gray-400 bg-opacity-25 border-gray-300 rounded-lg dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    {simulation?.equipment.description}
                  </div>
                  <div className="">
                    <ValvesHeaderView
                      valves={simulation?.equipment.composeComponents}
                      selectedValve={valveSelected!}
                      setValveSelected={setValveSelected}
                    />
                    {
                      valveSelected && (
                        <ValveTableView
                          valveSelected={valveSelected!}
                        />
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          valveSelected && (

            <div className="flex flex-col items-center justify-center w-1/4 h-full p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:mx-auto">
              {
                <ValveTimeLine
                  valves={valveSelected.events!}
                  title={valveSelected.description}
                />
              }
            </div>
          )
        }
      </div>
      {
        loading && <Loading />
      }
    </div >
  )
}

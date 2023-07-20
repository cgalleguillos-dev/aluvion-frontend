'use client';
import { BaseEquipment, Equipment } from '@/config/interfaces';
import React, { useEffect, useState } from 'react'
import NewEquipmentForm from './NewEquipmentForm';
import { LIMIT_EQUIPMENT_QUERY } from '@/constants';
import Loading from './common/Loading';
import { ShowEquipmentInfo } from './common/ShowEquipmentInfo';
import { useEquipmentFetch, useShowPopup } from '@/hooks';
import { useEquipmentContext } from '@/context';
import { BaseNavbar } from './BaseNavbar';


interface Props {
  equipmentsAux: Equipment[];
  baseEquipmentsAux: BaseEquipment[];
  numberTotalEquipmentsAux: number;
}
export const EquipmentView: React.FC<Props> = ({ equipmentsAux, baseEquipmentsAux, numberTotalEquipmentsAux }) => {
  const {
    setEquipments,
    setBaseEquipments,
    numberTotalEquipments,
    setNumberTotalEquipments,
    selectedEquipment,
    setSelectedEquipment,
    filteredEquipments,
    setFilteredEquipments
  } = useEquipmentContext();
  setEquipments(equipmentsAux);
  setBaseEquipments(baseEquipmentsAux);
  setNumberTotalEquipments(numberTotalEquipmentsAux);

  const [currentEquipments, setCurrentEquipments] = useState<Equipment[]>([]);
  const [page, setPage] = useState<number>(1);
  const { loading, deleteEquipment, getEquipmentsByPage, error } = useEquipmentFetch();
  const { showPopup, handleShowPopup, handleHidePopup } = useShowPopup();


  useEffect(() => {
    const getEquipments = async () => {
      const equipmentsData = await getEquipmentsByPage(page)
      setCurrentEquipments(equipmentsData!);
      setFilteredEquipments(equipmentsData!);
    }
    getEquipments();
  }, [page])


  const handleEquipmentClick = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    handleShowPopup();
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value;
    const filteredEquipments = currentEquipments.filter(equipment => equipment.description.toLowerCase().includes(filter.toLowerCase()));
    setFilteredEquipments(filteredEquipments);
  }

  const handleDeleteEquipment = async () => {
    await deleteEquipment(selectedEquipment!.id);
    const newEquipments = currentEquipments.filter(equipment => equipment.id !== selectedEquipment?.id);
    setFilteredEquipments(newEquipments);
    handleHidePopup();
  }

  const incrementPage = () => {
    if (page === Math.ceil(numberTotalEquipments / LIMIT_EQUIPMENT_QUERY)) {
      return;
    }
    setPage(page + 1);
  }

  const decrementPage = () => {
    if (page === 1) {
      return;
    }
    setPage(page - 1);
  }


  const disablePreviousButton = () => {
    return page === 1 ? true : false;
  }

  const disableNextButton = () => {
    return page === Math.ceil(numberTotalEquipments / LIMIT_EQUIPMENT_QUERY) ? true : false;
  }

  return (
    <>
      <div className="w-screen h-screen">
        {
          error && <div className="text-center text-red-500">{error}</div>
        }
        <BaseNavbar title='Equipos' isPage >
          <NewEquipmentForm />
        </BaseNavbar>
        <div className="mx-10 ">
          <div className="sm:-mx-6 lg:-mx-10">
            <div className="inline-block w-full py-2 align-middle">
              <div className="border-b border-gray-200 shadow dark:border-gray-700 sm:rounded-lg ">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="flex flex-row justify-between bg-gray-50">
                    <div className="flex flex-row items-center justify-between">
                      <div className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                        Descripción
                      </div>
                      <input type="text" placeholder="Buscar equipo" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase w-96 dark:text-gray-400"
                        onChange={handleFilterChange}
                      />
                    </div>
                  </div>
                  <div className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {
                      filteredEquipments.map((equipment, index) => (
                        <div key={index} onClick={() => handleEquipmentClick(equipment)}
                          className='cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'>
                          <div className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-gray-200">{equipment.description}</div>
                          </div>
                        </div>)
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-center mt-4">
                <div className="inline-flex rounded-md shadow">
                  <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md dark:border-gray-700 dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 "
                    onClick={decrementPage}
                    disabled={disablePreviousButton()}
                  >
                    Anterior
                  </button>
                </div>
                <div className="inline-flex ml-4 rounded-md shadow">
                  <button type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md dark:border-gray-700 dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 "
                    onClick={incrementPage}
                    disabled={disableNextButton()}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </div>
          {
            showPopup && (
              <ShowEquipmentInfo
                equipment={selectedEquipment!}
                handleHidePopup={handleHidePopup}
                handleDeleteEquipment={handleDeleteEquipment}
                loading={loading}
              />
            )
          }
        </div>
        {
          loading && <Loading />
        }
      </div>
    </>
  )
}

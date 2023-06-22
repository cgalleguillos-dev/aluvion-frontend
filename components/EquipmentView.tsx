'use client';
import { BaseEquipment, Equipment } from '@/config/interfaces';
import React, { useEffect, useState } from 'react'
import NewEquipmentForm from './NewEquipmentForm';
import { CustomButton } from './common';
import { LIMIT_EQUIPMENT_QUERY } from '@/constants';
import Loading from './common/Loading';
import { ShowEquipmentInfo } from './common/ShowEquipmentInfo';
import useEquipmentFetch from '@/hooks/useEquipmentFetch';


interface Props {
  equipments: Equipment[];
  baseEquipments: BaseEquipment[];
  numberTotalEquipments: number;
}
export const EquipmentView: React.FC<Props> = ({ equipments, baseEquipments, numberTotalEquipments }) => {
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment>();
  const [showInfoEquipment, setShowInfoEquipment] = useState<boolean>(false);
  const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>(equipments);
  const [currentEquipments, setCurrentEquipments] = useState<Equipment[]>([]);
  const [page, setPage] = useState<number>(1);
  const { loading, deleteEquipment, getEquipmentsByPage, error } = useEquipmentFetch();
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
    setShowInfoEquipment(true);
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
    setShowInfoEquipment(false);
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
      {
        error && <div className="text-red-500 text-center">{error}</div>
      }
      <div className="flex flex-col mt-4">
        <div className="sm:-mx-6 lg:-mx-10">
          <div className="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="border-b border-gray-200 dark:border-gray-700 shadow sm:rounded-lg ">
              <div className="divide-y divide-gray-200 dark:divide-gray-700
              
              ">

                <div className="flex flex-row justify-between bg-gray-50">
                  <div className="flex flex-row justify-between items-center">
                    <div className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                      Descripción
                    </div>
                    <input type="text" placeholder="Buscar equipo" className="w-96 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
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
                <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  disabled:opacity-50
                "
                  onClick={decrementPage}
                  disabled={disablePreviousButton()}
                >
                  Anterior
                </button>
              </div>
              <div className="inline-flex rounded-md shadow ml-4">
                <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  disabled:opacity-50
                "
                  onClick={incrementPage}
                  disabled={disableNextButton()}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <CustomButton
            description="Volver"
            onClick={() => { }}
          />
          <NewEquipmentForm baseEquipments={baseEquipments}
            setFilteredEquipments={setFilteredEquipments}
            filteredEquipments={filteredEquipments}
          />
        </div>
        {
          showInfoEquipment && (
            <ShowEquipmentInfo
              equipment={selectedEquipment!}
              setShowInfoEquipment={setShowInfoEquipment}
              handleDeleteEquipment={handleDeleteEquipment}
              loading={loading}
            />
          )
        }
      </div>
      {
        loading && <Loading />
      }
    </>
  )
}

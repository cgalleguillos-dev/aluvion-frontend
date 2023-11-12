'use client';
import { useState } from "react";
import { ShowValves } from "./common/ShowValves";
import { useRouter } from "next/navigation";
import { CustomButton, CustomCloseButton } from "./common";
import Loading from "./common/Loading";
import useEquipmentFetch from "@/hooks/useEquipmentFetch";
import { useEquipmentContext } from "@/context";
import { useShowPopup } from "@/hooks";


const NewEquipmentForm: React.FC = () => {
  const { baseEquipments, filteredEquipments, setFilteredEquipments, baseEquipmentSelected, baseEquipmentSelectedId
    , setBaseEquipmentSelected, setBaseEquipmentSelectedId
  } = useEquipmentContext();

  const [description, setDescription] = useState<string>('');
  const [valvesSelectedIds, setValvesSelectedIds] = useState<string[]>([]);
  const { loading, saveEquipments } = useEquipmentFetch();
  const { showPopup, handleShowPopup, handleHidePopup } = useShowPopup();
  const router = useRouter();


  const closePopup = () => {
    setValvesSelectedIds([]);
    setDescription('');
    handleHidePopup();
  }

  const handleBaseEquipmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setBaseEquipmentSelectedId(selectedId);
    setBaseEquipmentSelected(baseEquipments.find((baseEquipment) => baseEquipment.id === selectedId)!);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = e.target.value;
    if (e.target.checked) {
      setValvesSelectedIds([...valvesSelectedIds, selectedId]);
    } else {
      setValvesSelectedIds(valvesSelectedIds.filter((id) => id !== selectedId));
    }
  };

  const handleAddEquipment = async () => {
    const newEquipment = await saveEquipments({
      description: description,
      baseEquipmentId: baseEquipmentSelectedId!,
      composeComponentIds: valvesSelectedIds!
    })
    setFilteredEquipments([...filteredEquipments, newEquipment!]);
    closePopup();
    router.refresh();
  }

  const enableAddButton = () => {
    return description !== '' && baseEquipmentSelectedId !== '' && valvesSelectedIds.length > 0;
  }
  return <>

    <CustomButton
      description="Agregar equipo"
      onClick={handleShowPopup}
      enabled={true}
    />
    {
      showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col p-4 mt-4 bg-white rounded-lg sm:w-1/2 sm:mx-auto">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="flex flex-row justify-end">
                  <CustomCloseButton handleHidePopup={handleHidePopup} />
                </div>
                <form className="p-4 space-y-4">
                  <div className="flex flex-col ">
                    <h4 className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-400"
                    >Añadir nuevo equipo</h4>
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
                      htmlFor="baseEquipment"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Base Equipment
                    </label>
                    <select
                      id="baseEquipment"
                      value={baseEquipmentSelectedId!}
                      onChange={handleBaseEquipmentChange}
                      className="block w-full px-3 py-2 mt-1 text-sm text-gray-900 bg-gray-400 bg-opacity-25 border-gray-300 rounded-lg dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                    >
                      <option value={""}>Selecionar equipo base</option>
                      {baseEquipments!.map((baseEquipment) => (
                        <option key={baseEquipment.id} value={baseEquipment.id}>{baseEquipment.description}</option>
                      ))}
                    </select>

                  </div>
                  <div className="">
                    <label
                      htmlFor="baseEquipment"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Válvulas
                    </label>
                    <div className="flex flex-col space-y-2">
                      {baseEquipmentSelected?.arduinos?.map((arduino) => (
                        <ShowValves key={arduino!.id} arduino={arduino!}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-row-reverse">
                    <CustomButton
                      description="Agregar"
                      onClick={handleAddEquipment}
                      color="blue"
                      enabled={enableAddButton()}
                    />
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      )
    }
    {
      loading && <Loading />
    }
  </>
};

export default NewEquipmentForm;
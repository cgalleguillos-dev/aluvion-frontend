'use client'
import { CustomButton, ShowEquipmentsTable } from "./common";
import useEquipmentLoader from "@/hooks/useEquipmentLoader";
import Loading from "./common/Loading";
import { BaseNavbar } from "./BaseNavbar";


const LoadEquipmentsForm: React.FC = () => {
  const { loading, equipments, handleFileChange, saveEquipments } = useEquipmentLoader();


  return (
    <div className="w-screen h-screen">
      {
        loading && <Loading />
      }
      <BaseNavbar title="Cargar Equipos" isPage >
        <div>
          <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept=".json" onChange={handleFileChange} />
        </div>
        <CustomButton
          description="Cargar"
          onClick={saveEquipments}
          enabled={equipments.length > 0}
        />
      </BaseNavbar>
      <ShowEquipmentsTable equipments={equipments} />
      {loading && <Loading />}
    </div>
  )
}

export default LoadEquipmentsForm;
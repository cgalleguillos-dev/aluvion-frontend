'use client'
import { CustomButton, ShowEquipmentsTable } from "./common";
import useEquipmentLoader from "@/hooks/useEquipmentLoader";
import Loading from "./common/Loading";


const LoadEquipmentsForm: React.FC = () => {
  const { loading, equipments, handleFileChange, saveEquipments } = useEquipmentLoader();


  return (
    <div className="">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept=".json" onChange={handleFileChange} />
      </div>
      <ShowEquipmentsTable equipments={equipments} />
      <CustomButton
        description="Cargar"
        onClick={saveEquipments}
      />
      {loading && <Loading />}
    </div>
  )
}

export default LoadEquipmentsForm;
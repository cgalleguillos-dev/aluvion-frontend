'use client'
import { ShowEquipmentsTable } from "./common";
import useEquipmentLoader from "@/hooks/useEquipmentLoader";


const LoadEquipmentsForm: React.FC = () => {
  const { file, equipments, handleFileChange, saveEquipments } = useEquipmentLoader();


  return (
    <div className="">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept=".json" onChange={handleFileChange} />
      </div>
      <ShowEquipmentsTable equipments={equipments} />
      <button
        className="px-4 py-2 mt-4 ml-4 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        onClick={saveEquipments}
      >
        Save
      </button>
    </div>
  )
}

export default LoadEquipmentsForm;
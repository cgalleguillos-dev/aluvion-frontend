'use client'
import { CustomButton, ShowEquipmentsTable } from "./common";
import useEquipmentLoader from "@/hooks/useEquipmentLoader";
import Loading from "./common/Loading";


const LoadEquipmentsForm: React.FC = () => {
  const { loading, equipments, handleFileChange, saveEquipments } = useEquipmentLoader();


  return (
    <div className="w-screen h-screen mx-10 mt-4">
      <div className="sm:-mx-6 lg:-mx-10">
        <div className="inline-block w-full py-2 align-middle sm:px-6 lg:px-8">
          <div>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" accept=".json" onChange={handleFileChange} />
          </div>
          <CustomButton
            description="Cargar"
            onClick={saveEquipments}
          />
          <ShowEquipmentsTable equipments={equipments} />
        </div>
        {loading && <Loading />}
      </div>
    </div>
  )
}

export default LoadEquipmentsForm;
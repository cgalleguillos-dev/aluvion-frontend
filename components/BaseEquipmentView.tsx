import { BaseEquipment } from "@/config/interfaces";
import axios from "axios";
import { ShowBaseEquipments } from "./common";


async function fetchBaseEquipments(): Promise<BaseEquipment[]> {
  const URL = process.env.NEXT_PUBLIC_API + '/base-equipment';
  const response = await axios.get(URL);
  return response.data;
};

const BaseEquipmentView: React.FC = async () => {
  const equipments: BaseEquipment[] = await fetchBaseEquipments();


  return (
    <>
      <ShowBaseEquipments equipments={equipments} />
    </>
  );
};

export default BaseEquipmentView;
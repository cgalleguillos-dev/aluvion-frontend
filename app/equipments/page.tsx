import { EquipmentView } from '@/components/EquipmentView'
import { BaseEquipment, Equipment, ReturnFetchEquipments } from '@/config/interfaces';
import axios from 'axios';
import { NextPage } from 'next'
import { API, LIMIT_EQUIPMENT_QUERY } from '@/constants';


async function fetchEquipments(): Promise<ReturnFetchEquipments> {
  const URL = `${API.EQUIPMENT_PAGINATED}?page=1&limit=${LIMIT_EQUIPMENT_QUERY}`;
  const response = await axios.get(URL);
  const equipments: Equipment[] = response.data[0];
  const numberTotalEquipments: number = response.data[1];
  return {
    equipments,
    numberTotalEquipments
  };
};

async function fetchBaseEquipment(): Promise<BaseEquipment[]> {
  const URL = API.BASE_EQUIPMENT
  const response = await axios.get(URL);
  return response.data;
}

const Page: NextPage = async () => {
  const data = await fetchEquipments();
  const baseEquipments: BaseEquipment[] = await fetchBaseEquipment();
  const { equipments, numberTotalEquipments } = data;

  return <>

    <EquipmentView
      equipmentsAux={equipments!}
      baseEquipmentsAux={baseEquipments}
      numberTotalEquipmentsAux={numberTotalEquipments!}
    />
  </>
}

export default Page
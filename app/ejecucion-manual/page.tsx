import { ManualExecutionView } from '@/components';
import { Equipment } from '@/config/interfaces';
import { API } from '@/constants';
import axios from 'axios';
import { NextPage } from 'next'

async function fetchEquipments(): Promise<Equipment[]> {
  const URL = `${API.EQUIPMENT}`;
  const response = await axios.get(URL);
  const equipments: Equipment[] = response.data;
  return equipments;
}

interface Props { }

const ExecutionPage: NextPage<Props> = async ({ }) => {
  const equipments: Equipment[] = await fetchEquipments();

  return <>
    <ManualExecutionView
      equipments={equipments}
    />
  </>
}

export default ExecutionPage
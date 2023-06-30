import { ExecutorView } from '@/components';
import { Simulation } from '@/config/interfaces';
import { API } from '@/constants';
import axios from 'axios';
import { NextPage } from 'next'

async function getSimulations(): Promise<Simulation[]> {
  const URL = `${API.SIMULATION}`;
  const response = await axios.get(URL);
  const simulations: Simulation[] = response.data;
  return simulations;
}

const Page: NextPage = async () => {
  const simulations: Simulation[] = await getSimulations();
  return <>
    <ExecutorView
      simulations={simulations}
    />
  </>
}

export default Page
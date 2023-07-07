import { SimulationView } from '@/components';
import { Equipment, Simulation } from '@/config/interfaces';
import { API } from '@/constants';
import axios from 'axios';
import { NextPage } from 'next'

async function fetchEquipments(): Promise<Equipment[]> {
  const URL = `${API.EQUIPMENT}`;
  const response = await axios.get(URL);
  const equipments: Equipment[] = response.data;
  return equipments;
};

async function getSimulations(): Promise<Simulation[]> {
  const URL = `${API.SIMULATION}`;
  const response = await axios.get(URL);
  const simulations: Simulation[] = response.data;
  return simulations;
}

const SimulationsPage: NextPage = async () => {
  const equipments: Equipment[] = await fetchEquipments();
  equipments.forEach(equipment => {
    equipment.composeComponents.forEach(component => {
      component.events = [];
    })
  })

  const simulations: Simulation[] = await getSimulations();

  return <>
    <SimulationView
      simulations={simulations}
      equipments={equipments}
    />
  </>
}

export default SimulationsPage;
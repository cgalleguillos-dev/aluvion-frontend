import { IEventValves, OutputExecution, Simulation } from "@/config/interfaces";
import { useState } from "react";
import axios from "axios";
import { API } from "@/constants";

interface SimulationData {
  description: string;
  equipmentId: string;
  date?: Date;
  events: IEventValves[];
}

const useSimulationFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const saveSimulation = async (simulationData: SimulationData): Promise<Simulation | undefined> => {
    try {
      setLoading(true);
      simulationData.date = new Date();
      const response = await axios.post(API.SIMULATION, simulationData);
      const newSimulation = response.data as Simulation;
      setLoading(false)
      return newSimulation;
    } catch (error) {
      setError('Ha ocurrido un error al guardar la simulación');
      setLoading(false);
    }
  }

  const getSimulations = async (): Promise<Simulation[] | undefined> => {
    try {
      setLoading(true);
      const response = await axios.get(API.SIMULATION);
      const simulations = response.data as Simulation[];
      setLoading(false)
      return simulations;
    } catch (error) {
      setError('Ha ocurrido un error al obtener las simulaciones');
      setLoading(false);
    }
  }

  const executeSimulation = async (simulationId: string): Promise<OutputExecution | undefined> => {
    try {
      setLoading(true);
      const response = await axios.get(`${API.SIMULATION}/${simulationId}/execute`);
      const output = response.data as OutputExecution;
      setLoading(false)
      return output;
    } catch (error) {
      setError('Ha ocurrido un error al ejecutar la simulación');
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    saveSimulation,
    getSimulations,
    executeSimulation
  }
};

export default useSimulationFetch;
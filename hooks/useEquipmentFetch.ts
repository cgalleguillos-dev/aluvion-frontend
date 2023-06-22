import { Equipment } from "@/config/interfaces";
import { useState } from "react";
import axios from "axios";
import { API, LIMIT_EQUIPMENT_QUERY } from "@/constants";

interface NewEquipmentData {
  description: string;
  baseEquipmentId: string;
  composeComponentIds: string[];
}
const useEquipmentFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const saveEquipments = async (newEquipmentData: NewEquipmentData): Promise<Equipment | undefined> => {
    try {
      setLoading(true);
      const response = await axios.post(API.EQUIPMENT, newEquipmentData);
      const newEquipment = response.data as Equipment;
      setLoading(false)
      return newEquipment;
    } catch (error) {
      setError('Ha ocurrido un error al guardar el equipo');
      setLoading(false);
    }
  };

  const deleteEquipment = async (equipmentId: string): Promise<boolean> => {
    try {
      setLoading(true);
      await axios.delete(`${API.EQUIPMENT}/${equipmentId}`);
      setLoading(false)
      return true;
    } catch (error) {
      setError('Ha ocurrido un error al eliminar el equipo');
      setLoading(false);
      return false;
    }
  }

  const getEquipmentsByPage = async (page: number): Promise<Equipment[] | undefined> => {
    try {
      setLoading(true);
      const response = await axios.get(`${API.EQUIPMENT_PAGINATED}?page=${page}&limit=${LIMIT_EQUIPMENT_QUERY}`);
      const equipments = response.data[0] as Equipment[];
      setLoading(false)
      return equipments;
    } catch (error) {
      setError('Ha ocurrido un error al obtener los equipos');
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    saveEquipments,
    deleteEquipment,
    getEquipmentsByPage
  }

};

export default useEquipmentFetch;
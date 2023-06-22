import { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseEquipment } from '@/config/interfaces';
import { useRouter } from 'next/navigation';

const useEquipmentLoader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [equipments, setEquipments] = useState<BaseEquipment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const saveEquipments = async () => {
    try {
      setLoading(true);
      const URL = process.env.NEXT_PUBLIC_API + '/base-equipment/bulk';
      const response = await axios.post(URL, equipments);
      setFile(null);
      setEquipments([]);
      router.push('/auth/base-equipments')
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const loadEquipments = () => {
      if (file) {
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
          const equipments = JSON.parse(event.target?.result as string);
          setEquipments(equipments);
        }
        reader.readAsText(file);
      }
    };

    loadEquipments();
  }, [file]);

  return { file, equipments, handleFileChange, saveEquipments, loading };
};

export default useEquipmentLoader;

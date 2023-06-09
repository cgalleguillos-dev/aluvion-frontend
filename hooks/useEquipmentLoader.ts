import { useState, useEffect } from 'react';
import axios from 'axios';

interface BaseEquipment {
  description: string;
  components: Component[];
}

interface Component {
  description: string;
  pins: Pin[];
}

interface Pin {
  comunicationType: string;
  signalType: string;
  pinNumber: number;
}

const useEquipmentLoader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [equipments, setEquipments] = useState<BaseEquipment[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const saveEquipments = async () => {
    const URL = process.env.NEXT_PUBLIC_API + '/base-equipment/bulk';
    console.log(equipments);
    const response = await axios.post(URL, equipments);
    console.log(response);
  };

  useEffect(() => {
    const loadEquipments = () => {
      if (file) {
        const reader = new FileReader();
        const loadedEquipments: BaseEquipment[] = [];
        let baseEquipment: BaseEquipment | null = null;
        let currentComponent: Component | null = null;

        reader.onload = function (e) {
          const contents = e.target?.result;
          const lines = contents?.toString().split('\n');

          lines?.forEach(function (line: string) {
            const trimmedLine = line.trim();

            if (trimmedLine.length > 0) {
              const [key, value] = trimmedLine.split(':').map(part => part.trim());

              if (key === 'description') {
                baseEquipment = { description: value, components: [] };
              } else if (key === 'components') {
                baseEquipment!.components = [];
              } else if (key === '- description') {
                currentComponent = { description: value, pins: [] };
                baseEquipment!.components.push(currentComponent);
              } else if (key === '- comunicationType') {
                currentComponent!.pins.push({
                  comunicationType: value,
                  signalType: '',
                  pinNumber: 0
                });
              } else if (key === 'signalType') {
                const lastPin = currentComponent!.pins[currentComponent!.pins.length - 1];
                lastPin.signalType = value;
              } else if (key === 'pinNumber') {
                const lastPin = currentComponent!.pins[currentComponent!.pins.length - 1];
                lastPin.pinNumber = parseInt(value);
              }
            } else if (trimmedLine.length === 0 && baseEquipment) {
              loadedEquipments.push(baseEquipment);
              baseEquipment = null;
            }
          });

          setEquipments(loadedEquipments);
        };

        reader.readAsText(file);
      }
    };

    loadEquipments();
  }, [file]);

  return { file, equipments, handleFileChange, saveEquipments };
};

export default useEquipmentLoader;

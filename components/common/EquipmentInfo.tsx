import { Equipment } from '@/config/interfaces';
import React from 'react'

interface Props {
  equipment: Equipment;
}

const EquipmentInfo: React.FC<Props> = ({ equipment }) => {
  return (
    <div>EquipmentInfo</div>
  )
}

export default EquipmentInfo
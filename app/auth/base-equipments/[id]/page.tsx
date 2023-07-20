import { BaseEquipmentInfo } from '@/components';
import { BaseEquipment } from '@/config/interfaces';
import { NextPage } from 'next'

interface Props {
  params: {
    id: string
  }
};

const fetchBaseEquipment = async (id: string): Promise<BaseEquipment> => {
  const URL = process.env.NEXT_PUBLIC_API + '/base-equipment/' + id;
  const response = await fetch(URL, { cache: "no-store" }
  );
  const data: BaseEquipment = await response.json();
  return data;
};

const Page: NextPage<Props> = async ({ params: { id } }) => {
  const baseEquipment = await fetchBaseEquipment(id);
  return <>
    <BaseEquipmentInfo baseEquipment={baseEquipment} />
  </>
};

export default Page;
export interface BaseEquipment {
  id: string;
  description: string;
  components: Component[];
}

export interface Component {
  id: string;
  description: string;
  pins: Pin[];
}

export interface Pin {
  id: string;
  comunicationType: string;
  signalType: string;
  pinNumber: number;
}
export interface BaseEquipment {
  description: string;
  components: Component[];
}

export interface Component {
  description: string;
  pins: Pin[];
}

export interface Pin {
  comunicationType: string;
  signalType: string;
  pinNumber: number;
}
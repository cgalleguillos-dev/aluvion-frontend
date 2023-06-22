export interface BaseEquipment {
  id: string;
  description: string;
  arduinos: Arduino[];
}

export interface Equipment {
  id: string;
  description: string;
  composeComponents: ComposeComponent[];
}

export interface Arduino {
  id: string;
  description: string;
  components: Component[];
  composeComponents: ComposeComponent[];
}

interface BaseComponent {
  id: string;
  description: string;
  pins: Pin[];
  typeComponent: TypeComponent;
  arduino: Arduino;
}
export interface Component extends BaseComponent {

}

export interface TypeComponent {
  id: number;
  description: string;
}
export interface ComposeComponent extends BaseComponent {
  components: Component[];
}

export interface Pin {
  id: string;
  comunicationType: string;
  signalType: string;
  pinNumber: number;
}
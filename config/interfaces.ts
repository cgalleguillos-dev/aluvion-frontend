export interface BaseEquipment {
  id: string;
  description: string;
  arduinos: Arduino[];
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
  events?: IEventValves[];
}

export interface Pin {
  id: string;
  comunicationType: string;
  signalType: string;
  pinNumber: number;
}

export interface ReturnFetchEquipments {
  equipments: Equipment[] | undefined;
  numberTotalEquipments: number | undefined;
}

export interface ISideBar {
  href: string;
  label: string;
  subLabel?: string;
}

export interface IEventValves {
  valveId: string;
  valve: string;
  intensity: string;
  startTime: string;
  endTime: string;
}

export interface ResponseComposeComponent {
  id: string;
  description: string;
  components: Component[];
  events: Event[];
}

interface ResponseEquipment {
  id: string;
  description: string;
  isActived: boolean;
  composeComponents: ResponseComposeComponent[];
}
export interface Event {
  id: string;
  composeComponent: ResponseComposeComponent;
  intensity: string;
  startTime: string;
  endTime: string;
}

export interface Equipment {
  id: string;
  description: string;
  isActived: boolean;
  composeComponents: ComposeComponent[];
  baseEquipment: BaseEquipment;
}
export interface Simulation {
  id: string;
  date: Date;
  description: string;
  equipment: ResponseEquipment;
  eventList: Event[];
}

interface SetupOutputExecution {
  equipment: string;
  arduinos: string[];
  components:
  {
    description: string;
    pins:
    {
      pin: number;
      mode: string;
    }[]
  }[];
}

interface SimulationOutputExecution {
  type: string;
  events:
  {
    time: number;
    component: string;
    intensity: number;
  }[]
}
export interface OutputExecution {
  setup: SetupOutputExecution;
  simulation: SimulationOutputExecution;
}
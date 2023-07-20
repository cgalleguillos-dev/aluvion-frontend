'use client';
import { Arduino, BaseEquipment, Component, ComposeComponent, Pin } from '@/config/interfaces';
import React from 'react';
import { BaseNavbar } from './BaseNavbar';
interface Props {
  baseEquipment: BaseEquipment;
}

export const BaseEquipmentInfo: React.FC<Props> = ({ baseEquipment }) => {
  const [selectedArduino, setSelectedArduino] = React.useState(baseEquipment.arduinos[0])
  const [selectedComponent, setSelectedComponent] = React.useState<ComposeComponent | Component | undefined>(undefined);
  const [showPinPopup, setShowPinPopup] = React.useState(false);
  const [selectedPin, setSelectedPin] = React.useState<Pin | null>(null);

  const handleMouseEnterPin = (pin: Pin) => {
    setSelectedPin(pin);
    setShowPinPopup(true);
  };

  const handleMouseLeavePin = () => {
    setShowPinPopup(false);
  };


  const handleSelectedComponent = (component: ComposeComponent | Component) => {
    setSelectedComponent(component);
  }

  const handleSelectedArduino = (arduino: Arduino) => {
    setSelectedArduino(arduino);
  }
  return (
    <div className='w-screen h-screen'>
      <BaseNavbar title={baseEquipment.description} />
      <ul className='flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-[#0e314f] dark:border-gray-700 dark:text-gray-400'>
        {
          baseEquipment.arduinos.map((arduino, index) => (
            <li key={index} className={`flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400
            ${index === 0 ? 'border-l border-gray-200 dark:border-gray-700' : ''} 
            ${selectedArduino?.id === arduino.id ? 'bg-gray-300 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
            inline-block p-4 rounded-t-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800`}
              onClick={() => handleSelectedArduino(arduino)}
            >
              <span>{arduino.description}</span>
            </li>
          ))
        }
      </ul>
      <div className="flex flex-row justify-between px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-300 dark:text-gray-400 ">
        <div className="flex flex-row justify-between px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
          <span>Componentes</span>
        </div>
        <div className="flex flex-row justify-between px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
          <span>Pines</span>
        </div>
      </div>
      <div className="flex flex-row justify-between h-min">
        <div className="w-1/2 border-r border-[#0e314f] dark:border-gray-700">
          {
            selectedArduino && (
              <div className="flex flex-col justify-between h-full">
                {
                  selectedArduino.components.map((component, index) => (
                    <div key={index} className="flex flex-row justify-between border-b border-gray-200 cursor-pointer dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 "
                      onClick={() => handleSelectedComponent(component)}
                    >
                      <div className="flex flex-row items-center justify-between h-16">
                        <div className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                          {component.description}
                        </div>
                      </div>
                    </div>
                  ))
                }
                {
                  selectedArduino.composeComponents?.map((component, index) => (
                    <div key={index} className="flex flex-row justify-between border-b border-gray-200 cursor-pointer dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 "
                      onClick={() => handleSelectedComponent(component)}
                    >
                      <div className="flex flex-row items-center justify-between h-16">
                        <div className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                          {component.description}
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
        <div className="w-1/2">
          {
            selectedComponent && (
              selectedComponent.pins?.map((pin, index) => (
                <div key={index} className="flex flex-row justify-between border-b border-gray-200 cursor-pointer dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 "
                  onMouseEnter={() => handleMouseEnterPin(pin)}
                  onMouseLeave={() => handleMouseLeavePin()}
                >
                  {
                    showPinPopup && selectedPin?.id === pin.id && (
                      <div className="absolute z-10 flex flex-col justify-center w-32 h-32 p-2 text-xs text-center text-white -translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-md shadow-md top-1/2 left-1/2">
                        <div className="flex flex-row justify-center">
                          <span className="text-lg font-bold">Tipo: {pin.comunicationType}</span>
                        </div>
                        <div className="flex flex-row justify-center">
                          <span className="text-lg font-bold">Pin: {pin.pinNumber}</span>
                        </div>
                        <div className="flex flex-row justify-center">
                          <span className="text-lg font-bold">Señal: {pin.signalType}</span>
                        </div>
                      </div>
                    )
                  }
                  <div className="flex flex-row items-center justify-between h-16">
                    <div className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                      {pin.pinNumber}
                    </div>
                  </div>
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  );
};
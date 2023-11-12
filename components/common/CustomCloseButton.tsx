'use client';
import React from 'react'

interface Props {
  handleHidePopup: () => void;
}
export const CustomCloseButton: React.FC<Props> = ({ handleHidePopup }) => {

  const [confirmClose, setConfirmClose] = React.useState(false)

  const handleFirstButtonClick = () => {
    setConfirmClose(true)
  }

  return (
    <>
      <button
        className="top-0 right-0 mt-4 mr-4 "
        onClick={handleFirstButtonClick}
      >
        <svg className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {
        confirmClose &&
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="p-4 bg-white rounded-lg w-80">
            <p className="text-center text-gray-600 dark:text-gray-400">¿Estás seguro de que quieres cerrar?</p>
            <div className="flex items-center justify-center mt-8 space-x-4">
              <button
                className="px-4 py-2 text-gray-900 transition duration-300 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={handleHidePopup}
              >
                Cerrar
              </button>
              <button
                className="px-4 py-2 text-white transition duration-300 bg-red-500 rounded-lg hover:bg-red-600"
                onClick={() => setConfirmClose(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

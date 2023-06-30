import React from 'react'

interface Props {
  handleHidePopup: () => void;
}
export const CustomCloseButton: React.FC<Props> = ({ handleHidePopup }) => {
  return (
    <>
      <button
        className="absolute top-0 right-0 mt-4 mr-4"
        onClick={handleHidePopup}
      >
        <svg className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </>
  )
}

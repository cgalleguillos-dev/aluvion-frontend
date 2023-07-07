import React from 'react'

interface Props {
  description: string;
  onClick: () => void;
  color?: string;
  enabled: boolean;
};

const CustomButton: React.FC<Props> = ({
  description,
  onClick,
  color = 'blue',
  enabled = true
}) => {

  const className = `bg-blue-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
    ${enabled ? '' : 'opacity-50 cursor-not-allowed'}
  `

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={className}
        disabled={!enabled}
      >
        {description.toUpperCase()}
      </button>
    </>
  )
}

export default CustomButton
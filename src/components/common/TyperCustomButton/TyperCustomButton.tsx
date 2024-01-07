import React from 'react'

export default function TyperCustomButton({type = 'submit', label = "Zatwierdź", customClass = '', onClick = ()=>void 0}: {type?: 'submit', label?: string, customClass?: string, onClick?: Function}) {
  return (
    <button
    className={`flex justify-center items-center text-white bg-indigo-500 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-md text-sm px-5 py-2.5 my-2 ${customClass}`}
    type={type}
    onClick={(e)=>onClick(e)}
  >
    { label }
  </button>
  )
}

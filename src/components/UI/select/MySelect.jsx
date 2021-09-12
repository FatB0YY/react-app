import React from 'react'

const MySelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <select
      // двухстороннее связывание
      // управляемый компонент
      value={value}
      // следим за измнениями
      // здесь мы будем передавать не сам ивент, а сразу значение
      // которое выбрал пользователь
      onChange={(event) => onChange(event.target.value)}
    >
      <option disabled value=''>
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}

export default MySelect

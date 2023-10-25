import React from 'react';

const Dropdown = ({ label,name, value, options, onChange }) => {
  return (
    <div style={{display: 'flex', justifyContent: 'flex-start', width:'30rem', marginLeft: '1.5rem', marginBottom: '0.5rem'}}>
    <label>
      {label}:
    </label>
    <select name={name} value= {value ==='' ? '' : value } onChange={onChange} style={{width: '15rem'}}>
        <option value="" disabled>--- Select an option ---</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

import React from 'react';
import './Style.css'

const Input = ({ label, type, name, value, onChange }) => {
  return (
    // <div style={{width: '30rem', display: 'flex'}}>
    <div style={{width: '30rem', display: 'flex', justifyContent: 'flex-start', marginLeft: '1.5rem', marginBottom:'0.5rem'}}>
      <label>
        {label}:
      </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
    </div>
  );
};

export default Input;
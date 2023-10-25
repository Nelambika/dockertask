import React from 'react';
import './Style.css'

const Table = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <table className='table'>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, columnIndex) => (
              <td key={columnIndex}>{item[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
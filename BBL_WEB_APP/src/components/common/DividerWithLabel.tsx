import { Box } from '@mui/material'
import React from 'react'

type DividerWithLabelProps = {
  label: string;
  width?: string;
}

export default function DividerWithLabel({ label, width = '100px' }: DividerWithLabelProps) {
  const dividerStyle = {
    width: width,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0',
  };

  const lineStyle = {
    flex: '1',
    height: '1px',
    backgroundColor: '#A0A3BD',
  };

  const labelStyle = {
    padding: '0 10px',
    color: '#A0A3BD',
    fontSize: '12px'
  };

  return (
    <div style={dividerStyle}>
      <div style={lineStyle}></div>
      <div style={labelStyle}>{label}</div>
      <div style={lineStyle}></div>
    </div>
  );
};
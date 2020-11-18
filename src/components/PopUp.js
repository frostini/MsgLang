import React, { Component } from 'react'
import { Layer } from 'grommet'

export const PopUp = ({ 
  children,
  modal,
  onClickOutside,
  position, 
  full,
  ...rest 
}) => (
  <Layer
    position={position || 'top'}
    full={full || true}
    modal={modal}
    onClickOutside={onClickOutside}
    margin="large"
    responsive
    plain={modal ? false : true}
    {...rest}
  >
    {children}
  </Layer>
)
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import InputCity from './InputCity'
import InputCountry from './InputCountry'

const Box = styled.div`
  position: relative;
  margin: 5px 5px;
  padding: 5px 5px;
  border: 1pt solid black;
`;


export default function formLocation(props) {
  return (
    <Box>
      <InputCountry country={props.country} newCountry={props.newCountry}/>
      <InputCity country={props.country} city={props.city} newCity={props.newCity}/>
    </Box>
  )
}

formLocation.propTypes = {
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  newCity:PropTypes.func.isRequired,
  newCountry: PropTypes.func.isRequired
}


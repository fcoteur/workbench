import React from 'react'
import PropTypes from 'prop-types'

export default function Logout(props) {
  
  const logout = () => {
    props.login('','','',false)
  }

  return(
        <button onClick={logout}>logout</button>
    )
}

Logout.propTypes = {
  login: PropTypes.func.isRequired
}

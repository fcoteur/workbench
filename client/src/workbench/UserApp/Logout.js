import React from 'react'
import PropTypes from 'prop-types'

export default function Logout(props) {
  
  const logout = () => {
    props.login('','','',false)
  }

  return(
      <div>
        <button onClick={logout}>logout</button>
      </div>
    )
}

Logout.propTypes = {
  login: PropTypes.func.isRequired
}

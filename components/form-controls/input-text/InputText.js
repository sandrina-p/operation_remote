import React from 'react'
import PropTypes from 'prop-types'

const Input = React.forwardRef(({ error, hint, label, ...otherProps }, ref) => {
  return (
    <label style={{ display: 'block' }}>
      <span>{label}</span>
      <input ref={ref} {...otherProps}></input>
      {hint && <span>{hint}</span>}
      {error && <span>{error}</span>}
    </label>
  )
})

Input.propTypes = {
  error: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string,
}

export default React.memo(Input)

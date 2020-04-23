import React from 'react'
import PropTypes from 'prop-types'

const Select = React.forwardRef(({ children, error, hint, label, ...otherProps }, ref) => {
  return (
    <label style={{ display: 'block' }}>
      <span>{label}</span>
      <select ref={ref} {...otherProps}>
        {children}
      </select>
      {hint && <span>{hint}</span>}
      {error && <span>{error}</span>}
    </label>
  )
})

Select.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  error: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string,
}

export default React.memo(Select)

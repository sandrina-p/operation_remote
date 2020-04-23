import React from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'

import StylesShared from '../FormControls.module.css'
import Styles from './Select.module.css'

const Select = React.forwardRef(({ children, error, hint, label, ...otherProps }, ref) => {
  return (
    // Note: Very similar to TextInput...
    <label className={StylesShared.field}>
      <span className={StylesShared.label}>{label}</span>
      <select className={Styles.select} ref={ref} {...otherProps}>
        {children}
      </select>
      {hint && <span className={StylesShared.hint}>{hint}</span>}
      {error && <span className={StylesShared.error}>{error}</span>}
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

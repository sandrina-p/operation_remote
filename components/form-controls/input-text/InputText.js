import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import StylesShared from '../FormControls.module.css'
import Styles from './InputText.module.css'

const Input = React.forwardRef(({ error, hint, label, ...otherProps }, ref) => {
  return (
    <label className={StylesShared.field}>
      <span className={StylesShared.label}>{label}</span>
      <input className={Styles.input} ref={ref} {...otherProps}></input>
      {hint && <span className={StylesShared.hint}>{hint}</span>}
      {error && <span className={StylesShared.error}>{error}</span>}
    </label>
  )
})

Input.propTypes = {
  error: PropTypes.string,
  hint: PropTypes.string,
  label: PropTypes.string,
}

export default React.memo(Input)

import React from 'react'
import cx from 'classnames'

import Theme from '../../theme'
import Styles from './Form.module.css'

const Form = ({ children, className, ...otherProps }) => {
  return (
    <form className={cx(Styles.form, className)} {...otherProps}>
      {children}
    </form>
  )
}

const Header = ({ children, className, ...otherProps }) => {
  return (
    <div className={cx(Styles.header, className)} {...otherProps}>
      {children}
    </div>
  )
}

const Body = ({ children, className, ...otherProps }) => {
  return (
    <div className={cx(Styles.body, className)} {...otherProps}>
      {children}
    </div>
  )
}

const Footer = ({ children, className, ...otherProps }) => {
  return (
    <div className={cx(Styles.footer, className)} {...otherProps}>
      {children}
    </div>
  )
}

Form.Header = Header
Form.Body = Body
Form.Footer = Footer

export default Form

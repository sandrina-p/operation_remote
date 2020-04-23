import React from 'react'
import Link from 'next/link'
import cx from 'classnames'
import PropTypes from 'prop-types'
import Styles from './Button.module.css'

const Button = ({ children, href, icon, level, variant, ...otherProps }) => {
  const className = cx([Styles.btn, Styles[variant], Styles[level]])

  if (href) {
    return (
      <Link href={href}>
        <a className={className} {...otherProps}>
          {children}
        </a>
      </Link>
    )
  }

  return (
    <button className={className} {...otherProps}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  variant: 'solid',
  level: 'primary',
}

Button.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  variant: PropTypes.oneOf(['solid', 'light']),
  level: PropTypes.oneOf(['primary']),
}

export default React.memo(Button)

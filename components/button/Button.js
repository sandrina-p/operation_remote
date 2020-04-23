import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

const Button = ({ children, href, ...otherProps }) => {
  if (href) {
    return (
      <Link href={href}>
        <a {...otherProps}>{children}</a>
      </Link>
    )
  }

  return <button {...otherProps}>{children}</button>
}

Button.customProps = {
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

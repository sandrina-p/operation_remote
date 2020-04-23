import React from 'react'
import cx from 'classnames'

import Theme from '../Theme'
import Styles from './TablePretty.module.css'

/* 
NOTE:
Making a pretty table respecting the native HTML table is always a challenge.

The first thought usually is to do this with ul > li because of simplicity,
but that wouldn't be accessible for users using Assistive Technologies (ex: Screen Readers).

Or, if using a table, overwrite its display CSS property to use flex,
but that would defeat the whole purpose of having an accessible table
for keyboard and screen reader users.

I gave my best given the available time.
*/

const TablePretty = ({ children, className, ...otherProps }) => {
  return (
    <table className={cx(Styles.table, className)} {...otherProps}>
      {children}
    </table>
  )
}

const Head = ({ data, ...otherProps }) => {
  return (
    <thead className={Styles.head} {...otherProps}>
      <tr>
        {data.map((text, i) => (
          <th className={Theme.t_capsTiny} key={i}>
            {text}
          </th>
        ))}
      </tr>
    </thead>
  )
}

const Body = ({ children, ...otherProps }) => {
  return <tbody {...otherProps}>{children}</tbody>
}

const Row = ({ children, ...otherProps }) => {
  return (
    <tr className={Styles.row} {...otherProps}>
      {children}
    </tr>
  )
}

const RowCell = ({ children, ...otherProps }) => {
  return (
    <td className={Styles.rowCell} {...otherProps}>
      <div className={Styles.rowCell_inner}>{children}</div>
    </td>
  )
}

TablePretty.Head = Head
TablePretty.Body = Body
TablePretty.Row = Row
TablePretty.RowCell = RowCell

export default TablePretty

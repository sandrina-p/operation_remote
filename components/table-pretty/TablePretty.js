import React from 'react'
import cx from 'classnames'

import Theme from '../Theme'
import Styles from './TablePretty.module.css'

// Making a pretty table respecting the native HTML table is always a challenge

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

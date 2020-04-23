const TablePretty = ({ children }) => {
  return <table>{children}</table>
}

const Head = ({ data }) => {
  return (
    <thead>
      <tr>
        {data.map((text, i) => (
          <th key={i}>{text}</th>
        ))}
      </tr>
    </thead>
  )
}

const Body = ({ children }) => {
  return <tbody>{children}</tbody>
}

const Row = ({ children }) => {
  return <tr>{children}</tr>
}

const RowCell = ({ children }) => {
  return <td>{children}</td>
}

TablePretty.Head = Head
TablePretty.Body = Body
TablePretty.Row = Row
TablePretty.RowCell = RowCell

export default TablePretty

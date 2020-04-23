import React from 'react'
import initialEmployees from '../../data/employees.js'

const context = React.createContext({})

const { Provider, Consumer } = context

export { context as EmployeesContext }
export { Consumer as EmployeesConsumer }

export const EmployeesProvider = ({ children }) => {
  // NOTE: IRL this would come from some Backend (Firebase, Graphql, etc...)
  const [employees, setEmployees] = React.useState(initialEmployees)

  return (
    <Provider
      value={{
        employees,
        // NOTE: IRL split context in 2: state and methods. Thay way
        //  consumers using only methods don't re-render when state changes.
        updateEmployee,
        addEmployee,
      }}
    >
      {children}
    </Provider>
  )

  function updateEmployee(uid, newData) {
    setEmployees(emp => ({
      ...emp,
      [uid]: {
        ...emp[uid],
        ...newData,
      },
    }))
  }

  function addEmployee(data) {
    const uid = Date.now() // dummy but enough.

    setEmployees(emp => ({
      ...emp,
      [uid]: {
        ...data,
        currency: 'USD', // Add this field on form? Review w/designer
      },
    }))
  }
}

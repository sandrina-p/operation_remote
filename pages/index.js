import React from 'react'
import Head from 'next/head'

import { EmployeesContext } from '../store/employees-context'

import Button from '../components/button'
import Header from '../components/header'
import TablePretty from '../components/table-pretty'

export default function People() {
  const { employees } = React.useContext(EmployeesContext)
  const emplKeys = Object.keys(employees)
  const tableHead = ['Employee', 'Job title', 'Country', 'Salary', 'Actions']
  return (
    <main>
      <section>
        <header>
          <div>
            <h1>People</h1>
            <p>
              {emplKeys.length} {emplKeys.length === 1 ? 'empoyee' : 'empoyees'}
            </p>
          </div>
          <Button icon="person" href="/employee">
            Add employee
          </Button>
        </header>
        <TablePretty>
          <TablePretty.Head data={tableHead} />
          <TablePretty.Body>
            {emplKeys.map(uid => (
              <TablePretty.Row key={uid}>
                <TablePretty.RowCell>
                  <span>{employees[uid].name}</span>
                  <span>{employees[uid].birth}</span>
                </TablePretty.RowCell>

                <TablePretty.RowCell>
                  <span>{employees[uid].jobTitle}</span>
                </TablePretty.RowCell>

                <TablePretty.RowCell>
                  <span>{employees[uid].country}</span>
                </TablePretty.RowCell>

                <TablePretty.RowCell>
                  <span>{employees[uid].grossSalary}</span>
                </TablePretty.RowCell>

                <TablePretty.RowCell>
                  <Button href={`employee?uid=${uid}`}>Edit</Button>
                </TablePretty.RowCell>
              </TablePretty.Row>
            ))}
          </TablePretty.Body>
        </TablePretty>
      </section>
    </main>
  )
}

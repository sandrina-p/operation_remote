import React from 'react'
import Head from 'next/head'
import cx from 'classnames'

import { EmployeesContext } from '../store/employees-context'
import countries from '../data/countries'

import Theme from '../components/Theme'
import Button from '../components/button'
import Header from '../components/header'
import TablePretty from '../components/table-pretty'
import Styles from './Index.module.css'

export default function People() {
  const { employees } = React.useContext(EmployeesContext)
  const emplKeys = Object.keys(employees)
  const tableHead = ['Employee', 'Job title', 'Country', 'Salary', 'Actions']
  return (
    <main>
      <Head>
        <title>All employees</title>
      </Head>
      <section className={Theme.u_layout}>
        <header className={Styles.header}>
          <div className={Styles.header_txt}>
            <h1 className={Theme.t_3xl}>People</h1>
            <p className={cx(Styles.header_count, Theme.t_tiny, Theme.t_bold, Theme.c_txt_1)}>
              {emplKeys.length} {emplKeys.length === 1 ? 'employee' : 'employees'}
            </p>
          </div>
          <Button icon="person" href="/employee">
            Add employee
          </Button>
        </header>
        <TablePretty className={Styles.table}>
          <TablePretty.Head data={tableHead} />
          <TablePretty.Body>
            {emplKeys.map(uid => (
              <TablePretty.Row key={uid}>
                <TablePretty.RowCell>
                  <div>
                    <div className={cx(Theme.t_lg, Styles.table_name)}>{employees[uid].name}</div>
                    <span className={cx(Theme.t_sm, Theme.c_txt_1)}>
                      {employees[uid].birthdate}
                    </span>
                  </div>
                </TablePretty.RowCell>

                <TablePretty.RowCell>
                  <span>{employees[uid].jobTitle}</span>
                </TablePretty.RowCell>

                <TablePretty.RowCell>
                  <span>{countries[employees[uid].country]}</span>
                </TablePretty.RowCell>

                <TablePretty.RowCell>
                  <div classNames={Styles.table_price}>
                    {/* TODO - format salary */}
                    <span>{employees[uid].grossSalary}</span> {employees[uid].currency}{' '}
                    <span className={cx(Theme.t_tiny, Theme.c_txt_1)}>per year</span>
                  </div>
                </TablePretty.RowCell>

                <TablePretty.RowCell>
                  <Button href={`employee?uid=${uid}`} variant="outline" block>
                    Edit
                  </Button>
                </TablePretty.RowCell>
              </TablePretty.Row>
            ))}
          </TablePretty.Body>
        </TablePretty>
      </section>
    </main>
  )
}

import React from 'react'
import Head from 'next/head'
import cx from 'classnames'

import { EmployeesContext } from '../store/employees-context'
import countries from '../data/countries'

import Theme from '../components/Theme'
import Button from '../components/button'
import Header from '../components/header'
import TablePretty from '../components/table-pretty'
import Styles from './index.module.css'

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
            <p className={cx(Styles.header_count, Theme.t_tiny, Theme.t_bold)}>
              {emplKeys.length} {emplKeys.length === 1 ? 'employee' : 'employees'}
            </p>
          </div>
          <Button Icon={IconUser} href="/employee">
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
                  <div className={Styles.table_price}>
                    {/* TODO - format salary */}
                    <span>{employees[uid].grossSalary}</span> {employees[uid].currency}{' '}
                    <span className={Theme.t_tiny}>per year</span>
                  </div>
                </TablePretty.RowCell>

                <TablePretty.RowCell>
                  <Button href={`employee?uid=${uid}`} variant="light">
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

// NOTE 1: I didn't have access to the original icon, so I improvised.
const IconUser = props => (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
    <path
      fill="currentColor"
      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
    ></path>
  </svg>
)

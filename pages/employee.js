import React from 'react'
import Head from 'next/head'
import Router, { withRouter } from 'next/router'
import cx from 'classnames'
import { EmployeesContext } from '../store/employees-context'

import Theme from '../components/Theme'
import Header from '../components/header'
import Button from '../components/button'
import { Form, InputText, Select } from '../components/form-controls'

import Styles from './employee.module.css'

const Employee = ({ router }) => {
  const [uid, setUid] = React.useState(router.query.uid)

  React.useEffect(() => {
    setUid(router.query.uid)
  }, [router.query.uid])

  return (
    <main>
      <Head>
        <title>{uid ? 'Edit Employee' : 'Add employee'}</title>
      </Head>
      <EmployeeForm uid={uid} />
    </main>
  )
}

const EmployeeForm = ({ uid }) => {
  const { employees, updateEmployee, addEmployee } = React.useContext(EmployeesContext)
  const [newData, setNewData] = React.useState({})
  const [inlineErrors, setInlineErrors] = React.useState({})
  const [formMsg, setFormMsg] = React.useState({})

  // TODO DRY this with custom hook.
  const refName = React.useRef({})
  const refBirthdate = React.useRef({})
  const refJobTitle = React.useRef({})
  const refCountry = React.useRef({})
  const refGrossSalary = React.useRef({})

  const hasData = !!uid
  const data = hasData ? employees[uid] : {}

  return (
    <Form onSubmit={handleSubmit} className={cx(Theme.u_layout, Styles.form)}>
      <Form.Header>
        <div>
          <h1 className={Theme.t_2xl}>{hasData ? 'Edit employee' : 'Add a new employee'}</h1>
          <p className={cx(Theme.t_sm, Styles.form_description)}>
            {hasData
              ? 'Fill out the information of your new employee.'
              : 'Edit the information of your employee.'}
          </p>
        </div>
      </Form.Header>
      <Form.Body>
        <InputText
          ref={refName}
          label="Name"
          hint="First and last names"
          error={inlineErrors.name}
          placeholder="e.g. Jane Doe"
          defaultValue={data.name}
          onChange={e => handleUpdate('name', e.target.value)}
        />

        <InputText
          ref={refBirthdate}
          label="birthdate"
          hint="DD/MM/YYYY"
          error={inlineErrors.birthdate}
          placeholder="e.g. 17/02/1990"
          defaultValue={data.birthdate}
          onChange={e => handleUpdate('birthdate', e.target.value)}
        />

        <InputText
          ref={refJobTitle}
          label="Job title"
          hint="What is their role?"
          error={inlineErrors.jobTitle}
          placeholder="e.g. Product manger"
          defaultValue={data.jobTitle}
          onChange={e => handleUpdate('jobTitle', e.target.value)}
        />

        <Select
          ref={refCountry}
          label="Country"
          hint="Where are they based?"
          error={inlineErrors.country}
          defaultValue="US"
          onChange={e => handleUpdate('country', e.target.value)}
        >
          <option value="IS">Iceland</option>
          <option value="PT">Portugal</option>
          <option value="US">USA</option>
        </Select>

        <InputText
          ref={refGrossSalary}
          label="Salary"
          hint="Gross yearly salary"
          error={inlineErrors.grossSalary}
          placeholder=" e.g. 500000"
          defaultValue={data.grossSalary}
          onChange={e => handleUpdate('grossSalary', e.target.value)}
        />
      </Form.Body>
      <Form.Footer>
        {formMsg.msg && (
          <p aria-live="polite" className={cx(Styles.form_msg, Styles[formMsg.type])}>
            {formMsg.msg}
          </p>
        )}
        <div className={Styles.buttons}>
          <Button type="button" variant="light" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">{hasData ? 'Save' : 'Add employee'}</Button>
        </div>
      </Form.Footer>
    </Form>
  )

  function handleUpdate(inputName, value) {
    setNewData(data => ({ ...data, [inputName]: value }))
  }

  function handleCancel(e) {
    // TODO - if form has changed content, confirm if
    // you really want to cancel an ongoig form.
    Router.push('/')
  }

  function validateForm(fieldsToValidate) {
    // Just make it work ⏳
    const mapFields = {
      name: {
        el: refName,
        validator: {
          pattern: value => !!value,
          msg: 'The name is required.',
        },
      },
      birthdate: {
        el: refBirthdate,
        validator: {
          pattern: value => !!value, // TODO correct validator
          msg: 'The birthdate is required.',
        },
      },
      jobTitle: {
        el: refJobTitle,
        validator: {
          pattern: value => !!value, // TODO right validator
          msg: 'The job title is required.',
        },
      },
      country: {
        el: refCountry,
        validator: {
          pattern: value => !!value,
          msg: 'This country is required.',
        },
      },
      grossSalary: {
        el: refGrossSalary,
        validator: {
          pattern: value => !!value,
          msg: 'This salary is required.',
        },
      },
    }

    const errors = {}

    for (const name in fieldsToValidate || mapFields) {
      const value = mapFields[name].el.current.value
      const pattern = mapFields[name].validator.pattern
      if (!pattern(value)) {
        errors[name] = mapFields[name].validator.msg
      }
    }

    if (Object.keys(errors).length > 0) {
      setInlineErrors(errors)
      return false
    }

    return true
  }

  function handleSubmit(e) {
    e.preventDefault()
    setInlineErrors({})
    setFormMsg({})

    if (!validateForm(uid ? newData : null)) {
      setFormMsg({ type: 'error', msg: 'Ups! Some fields are invalid, please verify them.' })
      return
    }

    if (uid) {
      updateEmployee(uid, newData)
    } else {
      addEmployee(newData)
    }

    // Should we hide/update the buttons? Review/wdesigner
    setFormMsg({ type: 'success', msg: uid ? 'Changes saved!' : 'Employee added!' })
  }
}

export default withRouter(Employee)

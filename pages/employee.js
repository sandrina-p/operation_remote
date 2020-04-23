import React from 'react'
import Head from 'next/head'
import Router, { withRouter } from 'next/router'
import cx from 'classnames'
import PropTypes from 'prop-types'

import { EmployeesContext } from '../store/employees-context'
import countries from '../data/countries'

import Theme from '../components/theme'
import Header from '../components/header'
import Button from '../components/button'
import { Form, InputText, Select } from '../components/form-controls'

import Styles from './employee.module.css'

const Employee = ({ router }) => {
  const [uid, setUid] = React.useState(router.query.uid)
  const { employees } = React.useContext(EmployeesContext)

  React.useEffect(() => {
    setUid(router.query.uid)
  }, [router.query.uid])

  if (uid && !employees[uid]) {
    // Employee does not exist. Go back to index.
    // It can happen when refreshing the page with a new employee created.
    Router.push('/')
    return null
  }

  return (
    <main>
      <Head>
        <title>{uid ? 'Edit Employee' : 'Add employee'}</title>
      </Head>
      <EmployeeForm uid={uid} data={employees[uid] || {}} />
    </main>
  )
}

const EmployeeForm = ({ uid, data }) => {
  const { updateEmployee, addEmployee } = React.useContext(EmployeesContext)
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

  return (
    <Form onSubmit={handleSubmit} className={cx(Theme.u_layout, Styles.form)}>
      <Form.Header>
        <div>
          <h1 className={Theme.t_2xl} data-test="title">
            {hasData ? 'Edit employee' : 'Add a new employee'}
          </h1>
          <p
            className={cx(Theme.t_sm, Styles.form_description)}
            data-test="description"
          >
            {hasData
              ? 'Edit the information of your employee.'
              : 'Fill out the information of your new employee.'}
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
          name="name"
          defaultValue={data.name}
          aria-required="true"
          onChange={e => handleUpdate('name', e.target.value)}
        />

        <InputText
          ref={refBirthdate}
          label="Birthdate"
          hint="DD/MM/YYYY"
          error={inlineErrors.birthdate}
          placeholder="e.g. 17/02/1990"
          defaultValue={data.birthdate}
          name="birthdate"
          pattern="(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}"
          aria-required="true"
          onChange={e => handleUpdate('birthdate', e.target.value)}
        />

        <InputText
          ref={refJobTitle}
          label="Job title"
          hint="What is their role?"
          error={inlineErrors.jobTitle}
          placeholder="e.g. Product manger"
          name="jobTitle"
          defaultValue={data.jobTitle}
          aria-required="true"
          onChange={e => handleUpdate('jobTitle', e.target.value)}
        />

        <Select
          ref={refCountry}
          label="Country"
          hint="Where are they based?"
          error={inlineErrors.country}
          name="country"
          defaultValue="US"
          aria-required="true"
          onChange={e => handleUpdate('country', e.target.value)}
        >
          {Object.keys(countries).map(code => (
            <option value={code} key={code}>
              {countries[code]}
            </option>
          ))}
        </Select>

        <InputText
          ref={refGrossSalary}
          label="Salary"
          hint="Gross yearly salary"
          error={inlineErrors.grossSalary}
          placeholder=" e.g. 500000"
          defaultValue={data.grossSalary}
          name="grossSalary"
          inputMode="numeric"
          pattern="[0-9]*"
          aria-required="true"
          onChange={e => handleUpdate('grossSalary', e.target.value)}
        />
      </Form.Body>
      <Form.Footer data-test="formFooter">
        {formMsg.msg && (
          <p
            aria-live="polite"
            className={cx(Styles.form_msg, Styles[formMsg.type])}
          >
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
    console.log('::', inputName, value)
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
          pattern: value => !!value,
          msg: 'The birthdate is required.',
        },
      },
      jobTitle: {
        el: refJobTitle,
        validator: {
          pattern: value => !!value,
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
        // TODO add aria-invalid="true" to the element.
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

    if (!validateForm(hasData ? newData : null)) {
      setFormMsg({
        type: 'error',
        msg: 'Ups! Some fields are invalid, please verify them.',
      })
      return
    }

    if (hasData) {
      updateEmployee(uid, newData)
    } else {
      addEmployee(newData)
    }

    // Should we hide/update the buttons? Review w/designer
    setFormMsg({
      type: 'success',
      msg: hasData ? 'Changes saved!' : 'Employee added!',
    })
  }
}

EmployeeForm.prototypes = {
  data: PropTypes.objectOf({
    // TODO this...
  }),
}

export default withRouter(Employee)

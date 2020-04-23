import React from 'react'
import Router, { withRouter } from 'next/router'
import { EmployeesContext } from '../store/employees-context'
import Header from '../components/header'
import Button from '../components/button'
import { InputText, Select } from '../components/form-controls'

const Employee = ({ router }) => {
  const [uid, setUid] = React.useState(router.query.uid)

  React.useEffect(() => {
    setUid(router.query.uid)
  }, [router.query.uid])

  return (
    <main>
      <EmployeeForm uid={uid} />
    </main>
  )
}

const EmployeeForm = ({ uid }) => {
  const { employees, updateEmployee, addEmployee } = React.useContext(EmployeesContext)
  const [newData, setNewData] = React.useState({})
  const [inlineErrors, setInlineErrors] = React.useState({})
  const [formMsg, setFormMsg] = React.useState({})

  // TODO validate this data.
  const refName = React.useRef({})
  const refBirthdate = React.useRef({})
  const refJobTitle = React.useRef({})
  const refCountry = React.useRef({})
  const refGrossSalary = React.useRef({})

  const hasData = !!uid
  const data = hasData ? employees[uid] : {}

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>{hasData ? 'Edit employee' : 'Add a new employee'}</h1>
        <p>
          {hasData
            ? 'Fill out the information of your new employee.'
            : 'Edit the information of your employee.'}
        </p>
      </div>
      <div>
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
      </div>
      <div>
        {formMsg.msg && (
          <p aria-live="polite" className={formMsg.type}>
            {formMsg.msg}
          </p>
        )}
        <Button type="button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit">{hasData ? 'Save' : 'Add employee'}</Button>
      </div>
    </form>
  )

  function handleUpdate(inputName, value) {
    setNewData(data => ({ ...data, [inputName]: value }))
  }

  function handleCancel(e) {
    // TODO - confirm if you really want to cancel an ongoig form.
    // if form has content, confirm if you really want to cancel an ongoig form.
    Router.push('/')
  }

  function validateForm(fieldsToValidate) {
    // Just make it work. Later make it better:
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
          pattern: value => !!value, // TODO right validator
          msg: 'The birthdate should follow the pattern DD/MM/YYYY',
        },
      },
      jobTitle: {
        el: refJobTitle,
        validator: {
          pattern: value => !!value, // TODO right validator
          msg: 'The job title is required',
        },
      },
      country: {
        el: refCountry,
        validator: {
          pattern: value => !!value,
          msg: 'This country is required',
        },
      },
      grossSalary: {
        el: refGrossSalary,
        validator: {
          pattern: value => !!value,
          msg: 'This salary is required',
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

    setFormMsg({ type: 'error', msg: uid ? 'Changes saved!' : 'Employee added!' })
  }
}

export default withRouter(Employee)

import React from 'react'
import { upperFirst } from 'lodash'
import { ErrorMessage, Field } from 'formik'

const StyledFormGroup = ({ name, type="text", errors, hasLabel=true, labelText=null, separate=true, disabled=false, autoComplete=false }) => {
    const inputType = name.includes("password")
                        ? "password"
                        : name.includes("date")
                            ? "date"
                            : name.includes("email")
                                ? "email"
                                : type;

    const label = name.includes("re")
                    ? `Repeat ${upperFirst(name.substr(2))}`
                    : labelText || upperFirst(name)

    return (
        <div className={`form-group w-100 ${separate && hasLabel ? "my-3" : "m-0"}`}>
            { hasLabel && <label htmlFor={name}>{ label }</label> }
            <Field
                name={name}
                type={inputType}
                autoComplete={autoComplete ? "on" : "off"}
                disabled={disabled}
                placeholder={label}
                className='form-control'
            />
            <ErrorMessage name={name} component={
                () => <span className="error">
                            { errors[name] }
                        </span>
                }
            />
        </div>
    )
}

export default StyledFormGroup;

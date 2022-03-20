import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Formik } from 'formik'
import StyledFormGroup from '../../Helpers/Form/StyledFormGroup'
import Button from '../Layouts/Button/Button'
import { AxiosPost } from '../../Helpers/AxiosHttp'

const Content = () => {
    const navigate = useNavigate()

    return (
        <Formik
            initialValues={{ photo: '', description: '' }}
            validate={({ photo, description}) => {

            }}
            onSubmit={ async values => {
                const response = await AxiosPost('publications', values);
                if(response.status === 200){
                    navigate("/");
                }
            }}
        >
            { ({  }) => (
                <Form>
                    <p className="text-3xl">Upload content</p>

                    <StyledFormGroup name="photo" />
                    <StyledFormGroup name="description" />

                    <Button color="amber" className="" type="submit">Save</Button>
                </Form>
            ) }
        </Formik>
    )
}

export default Content

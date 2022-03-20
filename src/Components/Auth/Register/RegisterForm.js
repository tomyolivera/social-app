import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';

import UserContext from '../../../Context/user';
import { AxiosPost } from '../../../Helpers/AxiosHttp';

import Button from '../../Layouts/Button/Button';
import StyledFormGroup from '../../../Helpers/Form/StyledFormGroup';

const RegisterForm = () => {
    const navigate = useNavigate();
    const { getUser } = useContext(UserContext);

    return (
        <Formik
            initialValues={{ email: '', name: '', username: '', password: '' }}
            validate={({ email, name, username, password }) => {

            }}
            onSubmit={async user => {
                const response = await AxiosPost('http://localhost:5000/api/auth/register', user);
                if(response.status === 200){
                    await getUser();
                    navigate("/");
                }
            }}
        >
        { ({ isSubmitting }) => (
            <Form>
                <StyledFormGroup name="email" />
                <StyledFormGroup name="name" />
                <StyledFormGroup name="username" />
                <StyledFormGroup name="password" />

                <Button type="submit" disabled={isSubmitting} color="blue">
                    { isSubmitting ? 'Creating account...' : 'Register' }
                </Button>
            </Form>
            )}
        </Formik>
    )
}

export default RegisterForm

import React, { useContext } from 'react'
import { Form, Formik } from 'formik';

import { useNavigate } from 'react-router-dom';
import UserContext from '../../../Context/user';
import { AxiosPost } from '../../../Helpers/AxiosHttp';
import Button from '../../Layouts/Button/Button';
import StyledFormGroup from '../../../Helpers/Form/StyledFormGroup';

const LoginForm = () => {
    const navigate = useNavigate();
    const { getUser } = useContext(UserContext);

    return (
        <Formik
            initialValues={{ username: '', password: '' }}
            validate={({ username, password }) => {

            }}
            onSubmit={async ({ username, password }) => {
                const response = await AxiosPost('auth/login', { username, password });
                if(response.status === 200){
                    await getUser();
                    navigate("/");
                }
            }}
        >
        { ({ isSubmitting }) => (
            <Form>
                <StyledFormGroup name="username" />
                <StyledFormGroup name="password" />

                <Button color="emerald" type="submit" disabled={isSubmitting}>
                    { isSubmitting ? 'Logging in...' : 'Login' }
                </Button>
            </Form>
            )}
        </Formik>
    )
}

export default LoginForm

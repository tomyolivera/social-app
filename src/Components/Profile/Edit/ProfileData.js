import React, { useContext, useState } from 'react'
import { Form, Formik } from 'formik';
import axios from 'axios';

import Button from '../../Layouts/Button/Button';
import StyledFormGroup from '../../../Helpers/Form/StyledFormGroup';
import ToastContext from '../../../Context/toast';

const ProfileData = ({ user }) => {
    const [editing, setEditing] = useState(false);
    const { notify } = useContext(ToastContext);

    const toggle = () => setEditing(!editing);

    return (
        <Formik
                initialValues={{ name: user.name, username: user.username, email: user.email }}
                onSubmit={async ({ name, username, email }) => {
                    if(!name || !username || !email ||
                        user.name === name && user.username === username && user.email === email) return toggle()
                    
                    await axios.put(`http://localhost:5000/api/users/${user.id}`, { name, username, email }, { withCredentials: true }).then(() => {
                        toggle();
                        notify({ message: "Saved", color: "green" });
                    }).catch(() => notify({ message: "Something went wrong", color: "red" }));
                }}
            >
                { ({ isSubmitting, errors }) => (
                    <Form>
                        <StyledFormGroup disabled={!editing} errors={errors} name="name" />
                        <StyledFormGroup disabled={!editing} errors={errors} name="username" />
                        <StyledFormGroup disabled={!editing} errors={errors} name="email" />

                        <div className="d-flex align-items-center mt-3">
                            <Button type="submit" color="green" disabled={isSubmitting || !editing}>
                                { isSubmitting ? "Saving" : "Save" }
                            </Button>

                            {
                                editing
                                    ? <Button type="button" className="mx-3" color="red" onClick={toggle}>Cancel</Button>
                                    : <Button type="button" className="mx-3" color="black" onClick={toggle}>Edit</Button>
                            }
                        </div>
                            
                    </Form>
                ) }
            </Formik>
    )
}

export default ProfileData

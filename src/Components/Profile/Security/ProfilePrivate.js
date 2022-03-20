import React, { useEffect, useState } from 'react'

import { Field, Form, Formik } from 'formik';
import axios from 'axios';

import Button from '../../Layouts/Button/Button';

const ProfilePrivate = ({ user }) => {
    const [editing, setEditing] = useState(false);

    const toggle = () => setEditing(!editing);

    return (
        editing
            ? <Formik
                initialValues={{ is_private: user.is_private }}
                onSubmit={async ({ is_private }) => {
                    if(!is_private || is_private === user.is_private) return toggle();
                    await axios.put(`http://localhost:5000/api/users/${user.id}`, { is_private }, { withCredentials: true }).then(toggle);
                }}
            >
                { ({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label>
                                <Field type="radio" name="is_private" value="1" />
                                Private
                            </label><br />
                            <label>
                                <Field type="radio" name="is_private" value="0" />
                                Not Private
                            </label>
                        </div>

                        <div className="d-flex mt-3">
                            <Button type="submit" color="green" disabled={isSubmitting}>{ isSubmitting ? "Saving" : "Save" }</Button>
                            <Button type="button" className="mx-3" color="red" onClick={toggle}>Cancel</Button>
                        </div>
                    </Form>
                ) }
            </Formik>
            : <div>
                <p>Set if the account is private or not.</p>
                <Button color="black" onClick={toggle}>Edit</Button>
            </div>
    )
}

export default ProfilePrivate

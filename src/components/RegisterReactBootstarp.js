import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const RegisterReactBootstarp = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, SetSuccess] = useState(false);

    const handleRegister = (event) => {
        event.preventDefault();
        SetSuccess(false);

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setPasswordError('Please provide at least two uppercase letters!');
            return;
        }
        if (password.length < 6) {
            setPasswordError('Password Should be at least 6 characters!');
        }
        if (!/(?=.*[!@#$&*])/.test(password)) {
            setPasswordError('Password Should contain at least one special charecter');
            return;
        }
        setPasswordError('');



        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                SetSuccess(true);
                form.reset();
                ///
                verifyEmail();
                updateUsername(name);

            })
            .catch(error => {
                console.error('error', error);
                setPasswordError(error.message);
            })
    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                toast.warning('Please Check Your Email and Verify email address.')
            })
    };

    const updateUsername = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(() => {
                console.log('display Name updated!');
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className='w-50 mx-auto mt-5'>
            <h3 className='text-danger text-center pb-4 display-5'>Please Register</h3>
            <Form onSubmit={handleRegister}>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Accept all the terms and conditions." />
                </Form.Group>
                {passwordError ?
                    <p className='text-danger'>{passwordError}</p>
                    :
                    <p className='text-white' disabled> </p>
                }
                {
                    success && <p className='text-success'>User Created SuccesFully!</p>
                }
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <br />
            <p><small>Already have an account? please <Link to='/login'>Login</Link></small></p>
        </div>
    );
};

export default RegisterReactBootstarp;
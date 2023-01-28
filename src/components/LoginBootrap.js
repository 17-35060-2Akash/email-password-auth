import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth(app);

const LoginBootrap = () => {
    const [success, SetSuccess] = useState(false);
    const [userEmail, setuserEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        SetSuccess(false);

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                SetSuccess(true);
                toast.success('You are successfully Logged in!');
            })
            .catch(error => {
                console.error('error', error);
                toast.error('Not verified!' + error);
            })
    }

    const handleEmailBlur = (event) => {
        const email = event.target.value;
        setuserEmail(email);
    }

    const handleFotgetPassword = () => {
        if (!userEmail) {
            toast.error('Please Enter Your Email!')
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                toast.info('Password Reset Email Sent!');
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className='w-50 mx-auto text-start mt-5'>
            <h3 className='display-5 text-center pb-3'>Login</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                    <input onBlur={handleEmailBlur} type="email" name='email' className="form-control" id="formGroupExampleInput" placeholder="Your Email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="formGroupExampleInput2" placeholder="Your Password" required />
                </div>
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
            <br />
            <p><small>New to this website? please <Link to='/register'>Register</Link></small></p>
            <ToastContainer position='top-center' />
            <p>Forgot Passward? <button type="button" onClick={handleFotgetPassword} className="btn btn-link">Reset Password</button></p>

        </div>
    );
};

export default LoginBootrap;
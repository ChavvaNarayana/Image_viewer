import React, { useState } from 'react'

function FPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/forgotPassword', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            setMessage('Password reset email sent. Please check your email.');
        } else {
            setMessage('Something went wrong. Please try again later.');
        }
    };
    return (
        <>
            <div className="sign-in-parent">
                <div className="sign-in-form-container">
                    <form onSubmit={handleSubmit}>
                        <p>Enter your email to reset password</p>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button type="submit">Submit</button>
                    </form>
                    {message && <div>{message}</div>}
                </div>
            </div>

        </>
    )
}

export default FPassword
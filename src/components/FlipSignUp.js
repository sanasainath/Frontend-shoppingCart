import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FlipSignUp.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { signup } from '../action/useraction';
const FlipSignUp= () => {
  const isAuthenticated = useSelector((state) => state.auth.authenticate);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { firstName, lastName, email, password, userName, role };
    dispatch(signup(user))
      .then(() => {
        console.log('Form Data:', user);
        navigate('/');
      })
      .catch((error) => {
        // Handle error, if any
        console.error('Signup Error:', error);
      });
  };
return (
    <div className='git1'>
    <div className='dir1'>

  
    <div className="container1">
    <div className="login-box1">
        <h2 className='h22'>Sign Up</h2>
        <form onSubmit={handleSubmit} >
        <div className="input-box">
            <input   type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required />
            <label>First Name</label>
        </div>
        <div className="input-box">
            <input   type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required />
            <label>Last Name</label>
        </div>
        <div className="input-box">
            <input type="email" 
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
                console.log('Email Changed:', e.target.value); // Check if email is changing
            }}
            required />
            <label>Email</label>
        </div>
        
        <div className="input-box">
            <input type="password" 
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                console.log('Password Changed:', e.target.value); // Check if password is changing
            }}
            required />
            <label>Password</label>
        </div>
        <div className="input-box">
            <input   type='text'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required />
            <label>User Name</label>
        </div>
        <div className='form-group' style={{marginBottom:'25px'}} >
                    {/* <label>Select Role:</label> */}
                    <select
style={{
background: 'transparent',
border: '2px solid #2c4766',
borderRadius: '20px',
padding: '15px',
color: role === '' ? 'white' : 'whitesmoke',
}}
value={role}
onChange={(e) => setRole(e.target.value)}
className='input'
>
<option value='' style={{ color: 'white' ,background:'#1f293a'}}>Select Role</option>
<option value='user' style={{ color: 'whitesmoke',background:'#1f293a' }}>User</option>
<option value='admin' style={{ color: 'whitesmoke' ,background:'#1f293a'}}>Admin</option>
</select>


               

                </div>
        {/* <div className="forgot-pass">
            <a href="#">Forgot your password?</a>
        </div> */}
        <button type="submit" className="btn">Sign Up</button>
        <div className="signup-link">
        {!isAuthenticated && (
        <div className='signup-link'>
        <p style={{color:'whitesmoke',paddingBottom:'5px'}}>Already have an account?</p>

        <Link to='/signin'>login</Link>
        </div>
    )}
        </div>
        </form>
    </div>
    {/* {Array.from({ length: 50 }).map((_, i) => (
        <span key={i} style={{ '--i': i }}></span>
    ))} */}
    </div>
    </div>
    </div>
);
}

export default FlipSignUp;

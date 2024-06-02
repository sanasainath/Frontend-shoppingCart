import React, { useState, useEffect } from 'react';
import './FlipSign.css';
import { login } from '../action/authaction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate ,Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserLogin } from '../action/authaction';

const FlipSign = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.authenticate);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(UserLogin());
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            toast.success('Login successful!');
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: email,
            password: password,
            role: role,
        };
        dispatch(login(user));
    };

    return (
        <div className='git'>
            <ToastContainer />
            <div className='dir'>
                <div className="container">
                    <div className="login-box">
                        <h2 className='h22' style={{ marginTop: '10px', marginBottom: '-5px' }}>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="input-box">
                                <input type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />
                                <label>Email</label>
                            </div>
                            <div className="input-box">
                                <input type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                                <label>Password</label>
                            </div>
                            <div className='form-group' style={{ marginBottom: '25px' }}>
                                <select
                                    style={{
                                        background: 'transparent',
                                        border: '2px solid #2c4766',
                                        borderRadius: '20px',
                                        padding: '15px',
                                        color: role === '' ? 'white' : 'wheatsmoke',
                                    }}
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className='input'
                                >
                                    <option value='' style={{ color: 'white', background: '#1f293a' }}>Select Role</option>
                                    <option value='user' style={{ color: 'whitesmoke', background: '#1f293a  ' }}>User</option>
                                    <option value='admin' style={{ color: 'whitesmoke', background: '#1f293a' }}>Admin</option>
                                </select>
                            </div>
                            <button type="submit" className="btn">Login</button>
                            <div className="signup-link">
                                {!isAuthenticated && (
                                    <div className='signup-link' style={{ marginBottom: '20px' }}>
                                        <p>Don't have an account?</p>
                                        <Link to='/signup'>Signup</Link>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                    {Array.from({ length: 50 }).map((_, i) => (
                        <span key={i} style={{ '--i': i }}></span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FlipSign;

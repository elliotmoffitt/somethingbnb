import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupFormModal.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('asdf')
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

    // useEffect(() => {
    //   credential.length < 5 || password.length < 7 ? setDisabled(true) : setDisabled(false)
    // }, [credential, password, disabled])


  return (
    <>
    <div id='signup-modal'>
      <h1 style={{marginBottom: '10px'}}>Sign Up</h1>
      {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='inputs'
            placeholder='Email'
            required
            />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='inputs'
            placeholder='Username'
            required
            />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='inputs'
            placeholder='First Name'
            required
            />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='inputs'
            placeholder='Last Name'
            required
            />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='inputs'
            placeholder='Password'
            required
            />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='inputs'
            placeholder='Confirm Password'
            required
          />
        </label>

        <button type="submit" id={disabled ? 'signup-button' : 'signup-disabled'} >Sign Up</button>
      </form>
      </div>
    </>
  );
}

export default SignupFormModal;

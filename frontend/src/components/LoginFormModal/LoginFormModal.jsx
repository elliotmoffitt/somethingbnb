import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginFormModal.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const { closeModal } = useModal();
  const DEMO_CREDENTIAL = 'Demo-lition'
  const DEMO_PASSWORD = 'password'

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login(credential, password))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemo = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login(DEMO_CREDENTIAL, DEMO_PASSWORD))
    .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  }

  useEffect(() => {
    credential.length < 5 || password.length < 7 ? setDisabled(true) : setDisabled(false)
  }, [credential, password, disabled])

  return (
    <div id='login-modal'>
      <h1 style={{marginBottom: '10px'}}>Log In</h1>
      {errors.credential && (
          <p id="error">{errors.credential}</p>
        )}
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder='Username or Email'
            className='inputs'
            required
            />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            className='inputs'
            required
            />
        </label>

        <button type="submit" id={disabled ? 'login-disabled' : 'login-button'} disabled={disabled}>Log In</button>
      </form>
        <button id='demo-login-button' onClick={(e) => handleDemo(e)}>Demo Login</button>
    </div>
  );
}

export default LoginFormModal;

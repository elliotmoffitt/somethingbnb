import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './ProfileButton.css';
import { useNavigate } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const spots = useSelector(state => state.spots.allSpots);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    navigate('/');
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className="button-and-info">
        <button onClick={toggleMenu} id="profile-button">
          <FaBars />
          <FaUserCircle />
        </button>
        <div className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <div className="login-info">
                {user.username}
                <div>
                  {user.firstName} {user.lastName}
                </div>
                {user.email}
                <div>
                  <button onClick={() => navigate('/spots/current')} className='profile-buttons'>Manage Spots</button>
                </div>
                <div>
                  <button onClick={logout} className="profile-buttons">Log Out</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='login-info'>
                <button className="profile-buttons">
                  <OpenModalMenuItem
                    itemText="Log In"
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                  />
                </button>
                <button className="profile-buttons">
                  <OpenModalMenuItem
                    itemText="Sign Up"
                    onItemClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                  />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileButton;

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import somethingbnb from '../../assets/somethingbnb.png'


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul id='nav-bar'>
      <div>

      {/* <li> */}
        <NavLink to="/"><img src={somethingbnb} alt="somethingbnb"/></NavLink>
      {/* </li> */}
      </div>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;

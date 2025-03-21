import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import somethingbnb from '../../assets/somethingbnb.png'
import CreateSpotButton from './CreateSpotButton';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul id='nav-bar'>
      <div>

      {/* <li> */}
        <NavLink to="/"><img src={somethingbnb} alt="somethingbnb"/></NavLink>
      {/* </li> */}
      </div>
      <div id="nav-right">
        {sessionUser &&
          <CreateSpotButton />
        }
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      </div>
    </ul>
  );
}

export default Navigation;

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import somethingbnb from '../../assets/somethingbnb.png'
import CreateSpotButton from '../Spots/CreateSpot/CreateSpotButtom';


function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div id='nav-bar'>
      <div>
        <NavLink to="/"><img src={somethingbnb} alt="somethingbnb"/></NavLink>
      </div>
      <div id="nav-right">
        {sessionUser &&
          <CreateSpotButton />
        }
      {isLoaded && (
          <ProfileButton user={sessionUser} />
      )}
      </div>
    </div>
  );
}

export default Navigation;

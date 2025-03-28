import './CreateSpotButton.css';
import { NavLink } from 'react-router-dom';

const CreateSpotButton = () => {

    return (
        <>
        <NavLink to='/spots/new'>
          <button id="create-button">
            Create a New Spot
        </button>
        </NavLink>
      </>
    )
}

export default CreateSpotButton;

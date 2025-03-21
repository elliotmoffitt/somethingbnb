import './UpdateSpotButton.css';
import { useModal } from '../../../context/Modal';
import { NavLink } from 'react-router-dom';

const UpdateSpotButton = ({spot}) => {
    const { setModalContent } = useModal();

    const onClick = () => {
        setModalContent();
      };

    return (
        <>
            <NavLink to={`/spots/${spot.id}/edit`}>
                <button id='update-button' onClick={onClick}>
                    Update
                </button>
            </NavLink>
        </>
    )
}

export default UpdateSpotButton;

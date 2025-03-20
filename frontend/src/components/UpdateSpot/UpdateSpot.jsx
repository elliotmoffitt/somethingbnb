import './UpdateSpot.css';
import { useModal } from '../../context/Modal';
import UpdateSpotModal from '../UpdateSpotModal';

const UpdateSpot = ({spot}) => {
    const { setModalContent } = useModal();
    const {closeModal} = useModal();

    const onClick = () => {
        setModalContent(<UpdateSpotModal closeModal={closeModal} spot={spot}/>);
      };

    return (
        <>
            <button id='update-button' onClick={onClick}>
                Update
            </button>
        </>
    )
}

export default UpdateSpot;

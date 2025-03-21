import './DeleteSpot.css';
import { useModal } from '../../../context/Modal';
import DeleteSpotModal from '../DeleteSpotModal';

const DeleteSpot = ({spot}) => {
    const { setModalContent } = useModal();
    const {closeModal} = useModal();

    const onClick = () => {
        setModalContent(<DeleteSpotModal closeModal={closeModal} spot={spot}/>);
      };

    return (
        <>
            <button id='delete-button' onClick={onClick}>
                Delete
            </button>
        </>
    )
}

export default DeleteSpot;

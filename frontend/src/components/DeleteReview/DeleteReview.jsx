import './DeleteReview.css';
import { useModal } from '../../context/Modal';
import DeleteReviewModal from '../DeleteReviewModal';

const DeleteReview = ({ reviewId }) => {
    const { setModalContent } = useModal();
    const { closeModal } = useModal();

    const onClick = () => {
        setModalContent(<DeleteReviewModal closeModal={closeModal} reviewId={reviewId} />);
    };
        return (
            <>
                <button id='delete-button' onClick={onClick}>
                    Delete
                </button>
            </>
        )
    }

export default DeleteReview;

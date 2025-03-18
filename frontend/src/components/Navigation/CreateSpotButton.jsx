import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import OpenModalMenuItem from './OpenModalMenuItem';
import './CreateSpotButton.css';
import CreateSpotModal from '../CreateSpotModal';
import { useModal } from '../../context/Modal';

const CreateSpotButton = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    // if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(<CreateSpotModal/>);
    // if (typeof onItemClick === "function") onItemClick();
  };

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

        const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
          <button id="create-button" onClick={onClick}>
            Create a New Spot

        </button>
                  </>
    )
}

export default CreateSpotButton;

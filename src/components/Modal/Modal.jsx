import { Component } from 'react';
import { Backdrop, ModalWindow, CloseButton } from './Modal.styled';

class Modal extends Component {
  closeModalByEscape = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModalByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalByEscape);
  }
  render() {
    return (
      <Backdrop>
        <ModalWindow>
          <img
            src={
              'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' +
              this.props.currntAvatar.src
            }
            alt={this.props.currntAvatar.alt}
          />
          <CloseButton onClick={this.props.closeModal}>Close</CloseButton>
        </ModalWindow>
      </Backdrop>
    );
  }
}

export default Modal;

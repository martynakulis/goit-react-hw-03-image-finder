import React, { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.props.keyClose);
  }
  componentWillUnmount() {
    document.addEventListener('keydown', this.props.keyClose);
  }
  render() {
    const { src, close } = this.props;
    return (
      <div className={css.overlay} onClick={close}>
        <div className={css.modal}>
          <img src={src} alt="" />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  src: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  keyClose: PropTypes.func.isRequired,
};
export default Modal;

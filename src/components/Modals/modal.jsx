import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({show, component}) => {
    return  <div className={show ? 'd-block' : 'd-none'}>
                {component}
            </div>
}

Modal.propTypes = {
    show: PropTypes.bool,
    component:PropTypes.element
};

export default Modal;
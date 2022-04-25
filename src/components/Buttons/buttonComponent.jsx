import React from 'react';
import PropTypes from 'prop-types';

const ButtonComponent = ({btnProps, btnContent, btnClasses}) => {
    return (
        <button
            className={btnClasses}
            {...btnProps}
        >
            {btnContent}
        </button>
    )
};

ButtonComponent.propTypes = {
    btnProps: PropTypes.shape({}),
    btnContent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({})
    ]),
    btnClasses: PropTypes.string
}

export default ButtonComponent;
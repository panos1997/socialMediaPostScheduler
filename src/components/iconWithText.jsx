import React from 'react';
import PropTypes from 'prop-types';

// the icon can be before or after the text, depending on the 'textFirst' prop
const IconWithText = ({icon, text, classes, textFirst, extraProps}) => {
    return(
        <div className={classes?.wrapperClasses} {...extraProps}>
            {(icon && !textFirst) && icon}
            <span className={classes?.textClasses}>
                {text}
            </span>
            {(icon && textFirst) && icon}
        </div>
    )
}

IconWithText.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string,
    classes: PropTypes.shape({}),
    textFirst: PropTypes.bool,
    extraProps: PropTypes.shape({})
}

export default IconWithText;
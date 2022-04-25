import React from 'react';

const initialModalState = {
    modalShow: false,
    modalComponent: <></>,
}

// modal reducer
const modal = (state = initialModalState, action) => {
    switch(action.type) {
        case 'modal/setModalShow': {
            return {
                ...state,
                modalShow: action.payload
            };
        }
        case 'modal/setModalComponent': {
            return {
                ...state,
                modalComponent: action.payload
            };
        }
        default:
            return state;
    }
}

export default modal;
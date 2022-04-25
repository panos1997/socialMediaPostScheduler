import React, { forwardRef } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ButtonComponent from '../Buttons/buttonComponent';
import IconWithText from '../iconWithText';

const CalendarButton = forwardRef(({ value, onClick }, ref) => (
    <ButtonComponent 
      btnClasses='outlinedButton datepickerButton' 
      btnProps={{
        onClick: onClick,
        ref: ref
      }}
      btnContent={
        <IconWithText
          icon={<CalendarMonthIcon/>}
          text={value}
          classes={{
            wrapperClasses: 'flex-centered',
            textClasses: 'margin-r-10'
          }}
          textFirst={true}
        />
      }
    />
));

export default CalendarButton;
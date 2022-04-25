import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import CalendarButton from './Buttons/calendarButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSelector } from 'react-redux';
import moment from 'moment';

const ScheduleTimeOptions = ({showCalendar, setShowCalendar, selectedDate, setSelectedDate}) => {
    const schedulePostStore = useSelector(state => state?.schedulePost);

    return(
        <div className='flex-center-col margin-t-15'>
            <RadioGroup row defaultValue='schedulePost'>
                <FormControlLabel
                    value="schedulePost" 
                    checked={showCalendar}
                    control={<Radio />} 
                    label={schedulePostStore?.mode !== 'edit' ? 'Schedule' : 'Reschedule'}
                    onChange={() => setShowCalendar(true)}
                />
                <FormControlLabel 
                    value="postNow" 
                    control={<Radio />} 
                    label='Post Now'
                    onChange={() => {
                        setShowCalendar(false); 
                        setSelectedDate(moment().toDate())
                    }}
                />
            </RadioGroup>

            {/* 
                - past dates are disabled 
                - transform the moment object to a react date object, since the 'react-datepicker' package uses react date objects
                - the calendar is visible only if the 'Schedule' or 'Reschedule' option is selected, and it is hidden if the 'Post Now' option is selected
            */}
            {showCalendar && <DatePicker
                wrapperClassName='modalCalendar'
                selected={( schedulePostStore?.mode === 'edit' || (schedulePostStore?.mode !== 'edit' && moment(selectedDate).isAfter(moment()))) ? selectedDate : new Date()}
                onChange={(date) => setSelectedDate(date)}
                popperPlacement='top'
                timeIntervals={1}
                dateFormat="dd/MM/yyyy hh:mm"
                showTimeSelect
                customInput={<CalendarButton/>}
                minDate={moment().toDate()}
                minTime={moment(selectedDate).isSame(moment(), 'day') ? moment().toDate() : null}
                maxTime={moment(selectedDate).isSame(moment(), 'day') ? moment().endOf('day').toDate() : null}
            />}
        </div>
    )
}

ScheduleTimeOptions.propTypes = {
    showCalendar: PropTypes.bool,
    setShowCalendar: PropTypes.func,
    setSelectedDate: PropTypes.func,
    selectedDate: PropTypes.instanceOf(Date)
};

export default ScheduleTimeOptions;
import React from 'react';
import IconWithText from '../iconWithText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SettingsIcon from '@mui/icons-material/Settings';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch } from 'react-redux';

const VerticalMenu = () => {
    const dispatch = useDispatch();

    // when user clicks an option in the vertical menu, then we make this option 'active', 
    // and we also remove the 'activeTab' class from any other option in case it was previously selected
    const onOptionClick = (e, option) => {
        [...document.getElementsByClassName('menuOption')].filter((option) => !option.isSameNode(e.target)).forEach((option) => option.classList.remove('activeTab'));
        e.target.classList.add('activeTab');
        dispatch({ type: 'schedulePost/setPostsCategory', payload: option });
    }

    return(
        <div className='verticalMenu'>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <IconWithText
                        icon={<HomeIcon/>}
                        text='Posts'
                        classes={{
                            wrapperClasses: 'menuOption primaryOption flex-centered-start',
                            textClasses: 'margin-l-15'
                        }}
                    />
                </AccordionSummary>

                <AccordionDetails>

                    <IconWithText
                        icon={<ScheduleIcon/>}
                        text='Scheduled'
                        extraProps={{onClick: (e) => onOptionClick(e, 'scheduled')}}
                        classes={{
                            wrapperClasses: 'menuOption scheduledOption secondaryOption flex-centered-start',
                            textClasses: 'margin-l-15'
                        }}
                    />
                    <IconWithText
                        icon={<SendIcon/>}
                        text='Sent'
                        extraProps={{onClick: (e) => onOptionClick(e, 'sent')}}
                        classes={{
                            wrapperClasses: 'menuOption sentOption secondaryOption flex-centered-start',
                            textClasses: 'margin-l-15'
                        }}
                    />
                    <IconWithText
                        icon={<ScheduleSendIcon/>}
                        text='All'
                        extraProps={{onClick: (e) => onOptionClick(e, 'all')}}
                        classes={{
                            wrapperClasses: 'menuOption sentOption secondaryOption flex-centered-start activeTab',
                            textClasses: 'margin-l-15'
                        }}
                    />
                </AccordionDetails>
            </Accordion>
            
            <IconWithText
                icon={<SettingsIcon/>}
                text='Settings'
                classes={{
                    wrapperClasses: 'menuOption primaryOption flex-centered-start',
                    textClasses: 'margin-l-15'
                }}
            />
        </div>
    )
}

export default VerticalMenu;
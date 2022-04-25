import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import ButtonComponent from '../Buttons/buttonComponent';
import IconWithText from '../iconWithText';
import SchedulePostModal from '../Modals/schedulePostModal';
import { useDispatch } from 'react-redux';

const navBarOptions = ['Schedule Post'];

const NavigationBar = () => {
  const dispatch = useDispatch();

  // show the modal on 'schedule' mode
  const showSchedulePostModal = () => {
    dispatch({ type: 'schedulePost/setMode', payload: 'schedule' });
    dispatch({ type: 'modal/setModalShow', payload: true});
    dispatch({ type: 'modal/setModalComponent', payload:  <SchedulePostModal/>});
  }

  return (
    <AppBar className="navigationBar" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="flex-centered-space-between">
          <div className='flex-start'>
            <IconWithText
              icon={<ScheduleSendIcon className='logoIcon' />}
              text='My Post Scheduler'
              classes={{
                wrapperClasses: 'margin-r-20',
                textClasses: 'mainHeaderFont margin-l-5'
              }}
            />

            {navBarOptions.map((page, index) => (
              <ButtonComponent
                key={index}
                btnClasses='mainButton'
                btnContent={page}
                btnProps={{onClick: showSchedulePostModal}}
              />
            ))}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavigationBar;

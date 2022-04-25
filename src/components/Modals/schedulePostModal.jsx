import React, {useState, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonComponent from '../Buttons/buttonComponent';
import CloseIcon from '@mui/icons-material/Close';
import IconWithText from '../iconWithText';
import TextField from '@mui/material/TextField';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ScheduleTimeOptions from '../scheduleTimeOptions';
import SocialMediaOptions from '../socialMediaOptions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import classnames from 'classnames';

const SchedulePostModal = () => {
  const [selectedDate, setSelectedDate] = useState(moment().toDate());
  const [showCalendar, setShowCalendar] = useState(true);
  const [postContent, setPostContent] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const modalStore = useSelector(state => state?.modal);
  const schedulePostStore = useSelector(state => state?.schedulePost);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!modalStore?.modalShow) return;
    
    if(schedulePostStore?.mode === 'edit') {
      setPostContent(schedulePostStore?.postBeingEdited?.text);
      setSelectedDate(moment(schedulePostStore?.postBeingEdited?.date)?.toDate());
    }
    else {
      setPostContent('');
      setSelectedDate(moment()?.toDate());
    }

    initializeModal();
  // eslint-disable-next-line
  }, [modalStore?.modalShow]);

  const initializeModal = () => {
    setShowError(false);
    setErrorMessage('');
    setShowCalendar(true);
  }

  const closeModal = () => {
    dispatch({ type: 'modal/setModalShow', payload: false});
  }

  const schedulePost = (content, date, mode) => {
    // if the post's text is empty (including case where it contains only line breaks), then show the empty error message to the user
    if(content?.length === 0 || /^\s*$/.test(content)) {
      setShowError(true);
      return setErrorMessage('The post field can not be empty');
    };

    // close the modal
    closeModal();

    // update an existing post, or create a new one (depending if we are in 'edit' mode or not)
    const newOrUpdatedPost = {
      text: content,
      date: moment(date).isAfter(moment()) ? moment(date) : moment()
    }

    if(mode === 'edit') dispatch({ type: 'schedulePost/updatePost', payload: newOrUpdatedPost });
    else dispatch({ type: 'schedulePost/addPost', payload: newOrUpdatedPost });
  }

  const onPostChange = (e) => {
    const newContent = e?.target?.value;
    setPostContent(newContent);

    if(newContent?.length > 0) setShowError(false);
  }

  // the modal in edit mode has some visual differences (height etc), so it get's an extra class
  const getModalClasses = (mode) => {
    return classnames('modal', {'editMode': mode === 'edit'})
  }

  // if there is an error, then we want to disable the 'schedule' button
  const getScheduleButtonClasses = (error) => {
    return classnames('mainButton', {'disabled' : error});
  }
  
  return (
    <div>
      <Dialog 
        className={getModalClasses(schedulePostStore?.mode)}
        open={modalStore?.modalShow}
        fullWidth
      >
        <DialogTitle className='flex-centered-space-between'>
          <span>
            {schedulePostStore?.mode !== 'edit' ? 'Schedule Post' : 'Edit Post'}
          </span>
          <CloseIcon 
            className='iconButton'
            onClick={closeModal}
          />
        </DialogTitle>
        <DialogContent>
          {schedulePostStore?.mode !== 'edit' && <SocialMediaOptions />}

          <TextField
            className='modalTextArea'
            multiline
            rows={4}
            placeholder='Type Something..'
            onChange={onPostChange}
            value={postContent}
          />

          { 
            showError && <IconWithText
                icon={<ErrorOutlineIcon/>}
                text={errorMessage}
                classes={{
                  wrapperClasses: 'mainErrorFont margin-t-10 flex-centered-start',
                  textClasses: 'margin-l-5'
                }}         
            />
          }

          <ScheduleTimeOptions 
            showCalendar={showCalendar}
            setShowCalendar={setShowCalendar}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </DialogContent>

        <DialogActions>
            <ButtonComponent
                btnClasses='outlinedButton margin-r-10'
                btnContent='Cancel'
                btnProps={{onClick: closeModal}}
            />
            <ButtonComponent
                btnClasses={getScheduleButtonClasses(showError)}
                btnContent={schedulePostStore?.mode !== 'edit' ? 'Schedule' : 'Save'}
                btnProps={{onClick: () => schedulePost(postContent, selectedDate, schedulePostStore?.mode)}}
            />
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SchedulePostModal;
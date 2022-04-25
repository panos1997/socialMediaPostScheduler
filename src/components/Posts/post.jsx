import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ButtonComponent from '../Buttons/buttonComponent';
import TwitterIcon from '@mui/icons-material/Twitter';
import PropTypes from 'prop-types';
import SchedulePostModal from '../Modals/schedulePostModal';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import classnames from 'classnames';

const Post = ({postContent, postDate}) => {
    const dispatch = useDispatch();

    // open the modal in 'edit' mode
    const onEditClick = (date, text) => {
        dispatch({ type: 'schedulePost/setPostBeingEdited', payload: {date, text} });
        dispatch({ type: 'schedulePost/setMode', payload: 'edit' });
        dispatch({ type: 'modal/setModalShow', payload: true });
        dispatch({ type: 'modal/setModalComponent', payload:  <SchedulePostModal/>});
    }

    const onDeleteClick = (date, content) => {
        dispatch({ 
            type: 'schedulePost/removePost', 
            payload: {
                postDate: moment(date), 
                postContent: content
            }
        });
    }

    // get text until the nth line break (the rest of the text will be viewed by the user if he clicks the 'View All' button)
    const getTextUntilLineBreak = (lineBreakNum, text) => {
        const textArray = text.split('\n');
        let concatTexts = '';
        textArray.forEach((text, index) => {
            if(index >= lineBreakNum) return;
            concatTexts = concatTexts.concat(`\n${text}`);
        });

        return concatTexts;
    }

    const textHasMoreThanNLines = (num, text) => text?.split(/\r\n|\r|\n/).length > num;

    const getDateLabelClasses = (date) => {
        return classnames('label', {'sent': !moment(date).isAfter(moment())});
    }

    return(
        <Card className='post'>
            <CardContent>
                <div className='flex-start-space-between'>
                    <TwitterIcon className='twitterIcon' />
                    <div className='datePosted'>
                        <div className={getDateLabelClasses(postDate)}>
                            {moment(postDate).isAfter(moment()) ? 'Scheduled' : 'Sent'} 
                        </div>
                        <div>{moment(postDate).format('DD/MM/YYYY hh:mm')}</div>
                    </div>
                </div>

                {/* 
                    if text has more than 150 characters, then show only the first 150
                    if text has more than 6 line breaks, then show only the first 6 lines
                    (in the above cases, the 'View All' button appears so that the user can see the rest of the message)
                */}
                <div className='post-content margin-t-15'>
                    <span style={{whiteSpace: 'pre-wrap'}}>
                        {
                            !textHasMoreThanNLines(6, postContent)
                            ? postContent?.slice(0, 150)
                            : getTextUntilLineBreak(6, postContent)}
                    </span>
                    {
                        (postContent?.length > 150 || textHasMoreThanNLines(6, postContent))
                        && <span 
                                className='simpleButton' 
                                onClick={() => onEditClick(postDate, postContent)}
                            > ...View All </span>}
                </div>
            </CardContent>

            <CardActions className='flex-start-end'>
                <ButtonComponent
                    btnClasses='outlinedButton'
                    btnContent='Delete'
                    btnProps={{onClick: () => onDeleteClick(postDate, postContent)}}
                />
                <ButtonComponent
                    btnClasses='mainButton'
                    btnContent='Edit'
                    btnProps={{onClick: () => onEditClick(postDate, postContent)}}
                />
            </CardActions>
        </Card>
    )
}

Post.prototypes = {
    postContent: PropTypes.string,
    postDate: PropTypes.instanceOf(Date)
}

export default Post;
import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import IconWithText from './iconWithText';

// only the twitter option is enabled, the rest ones are disabled and a tooltip appears when user hovers over them, that has the text: 'Coming Soon'
const SocialMediaOptions = () => {
    return(
        <RadioGroup row defaultValue='twitter'>
            <FormControlLabel 
                value="twitter" 
                control={<Radio />} 
                label={
                    <IconWithText
                    icon={<TwitterIcon className='twitterIcon' />}
                    text='Twitter'
                    classes={{
                        wrapperClasses: 'flex-centered margin-r-20',
                        textClasses: 'margin-l-5'
                    }}
                    />    
                }
            />
            <Tooltip
                title='Coming Soon!'
                placement='top'
                PopperProps={{
                    className: 'modalTooltip'
                }}
            >
                <FormControlLabel
                    value="facebook" 
                    disabled
                    control={<Radio />}
                    label={
                    <IconWithText
                        icon={<FacebookIcon />}
                        text='Facebook'
                        classes={{
                        wrapperClasses: 'flex-centered margin-r-20',
                        textClasses: 'margin-l-5'
                        }}
                    />   
                    }
                />
            </Tooltip>
            <Tooltip
                title='Coming Soon!'
                placement='top'
                PopperProps={{
                    className: 'modalTooltip'
                }}
            >
                <FormControlLabel
                    value="instagram" 
                    disabled
                    control={<Radio />}
                    label={
                    <IconWithText
                        icon={<InstagramIcon />}
                        text='Instagram'
                        classes={{
                        wrapperClasses: 'flex-centered margin-r-20',
                        textClasses: 'margin-l-5'
                        }}
                    />   
                    }
                />
            </Tooltip>
      </RadioGroup>
    )
}

export default SocialMediaOptions;
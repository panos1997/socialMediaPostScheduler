import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Post from './post';
import { useSelector } from 'react-redux';
import moment from 'moment';

const PostsList = () => {
    const [posts, setPosts] = useState([]);

    const schedulePostStore = useSelector(state => state?.schedulePost);

    // depending on which tab we are ('scheduled', 'sent' or 'all'), we show the corresponding posts list
    useEffect(() => {
        let filteredPosts = schedulePostStore?.posts;

        // 'scheduled' posts are the ones that have been scheduled for the future and they are not posted yet
        if(schedulePostStore?.postsCategory === 'scheduled') {
            filteredPosts = schedulePostStore?.posts?.filter((post) => moment(post?.date).isAfter(moment()));
            setPosts(filteredPosts);
        // 'sent' posts are the ones that have already been posted
        } else if(schedulePostStore?.postsCategory === 'sent') {
            filteredPosts = schedulePostStore?.posts?.filter((post) => moment().isAfter(moment(post?.date)));
            setPosts(filteredPosts);
        }
        else if(schedulePostStore?.postsCategory === 'all') setPosts(filteredPosts);
    }, [schedulePostStore?.postsCategory, schedulePostStore?.posts]);

    return(
        <div className='postsList'>
            <Grid container spacing={1} className='postsList-grid' sx={{overflow: 'hidden', wrap: "nowrap"}}>
                {posts.map((post, index) => {
                    return(
                        <Grid item className='postsList-grid item' key={index}>
                            <Post postContent={post?.text} postDate={post?.date}/>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default PostsList;
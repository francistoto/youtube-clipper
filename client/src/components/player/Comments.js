import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';

const Comments = () => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    const handleChange = (e) => {
        setNewComment(e.currentTarget.value);
    }

    const handleCancel = (e) => {
        e.preventDefault();

        if (newComment.length > 0) {
            setNewComment('');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newComment.length > 0) {
            setComments((comments) => comments.concat({ text: newComment }));
            setNewComment('');
        }
    }

    const renderComments = () => {
        if (comments && comments.length > 0) {
            return comments.map((comment, index) => {
                return (
                    <Card key={index} style={{ margin: '10px', width: '100%' }}>
                        <CardContent>
                            <Typography variant='body1'>{comment.text}</Typography>
                        </CardContent>
                    </Card>
                )
            });
        }

        return (
            <Card style={{ margin: '10px', width: '100%' }}>
                <CardContent>
                    <Typography variant='body1'>No comments for this video.</Typography>
                </CardContent>
            </Card>
        )
    };

    return (
        <div>
            <Grid container className='comments-input' alignContent='center' justify='center'>
                <Grid item xs={8}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id='new-comment-textfield'
                            name='newComment'
                            placeholder={'Enter a comment here...'}
                            maxLength={200}
                            multiline
                            variant='outlined'
                            rows={4}
                            value={newComment}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                            }}
                        />
                        <Button type='submit' onClick={handleCancel}>Cancel</Button>
                        <Button type='submit'>Submit</Button>
                    </form>
                </Grid>
            </Grid>
            <Grid container className='comments' alignContent='center' justify='center'>
                <Grid item xs={8}>
                    {renderComments()}
                </Grid>
            </Grid>
        </div>
    );
};

export default Comments;

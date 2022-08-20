import React, { useState } from 'react';
import $ from "jquery";

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'


import './styles/comment.scss';
import { Box, Stack, TextField } from '@mui/material';

type Comment = {
    id: string;
    userId: string;
    postId: string;
    body: string;
    netVote: number;
    replies: Array<Comment> | undefined;
    createdAt: string | undefined;
}

export default function Comment({ id, userId, replies, createdAt, body, postId, netVote }: Comment) {
    const [showReply, setShowReply] = useState(false);
    const [showThread, setShowThread] = useState(true);

    // function showReply(commentId: string) {
    //     console.log(commentId)
    //     $('#reply_box-' + commentId).css('display', 'inline-block');
    // }

    // function hideThread(commentId: string) {
    //     console.log(commentId)
    //     $('#expand-comment-' + commentId).removeClass('hidden');
    //     $('#comment_contents-' + commentId).addClass('hidden');
    //     $('#comment_side_bar-' + commentId).addClass('hidden');
    // }

    // function expandThread(commentId: string) {
    //     $('#expand-comment-' + commentId).addClass('hidden');
    //     $('#comment_contents-' + commentId).removeClass('hidden');
    //     $('#comment_side_bar-' + commentId).removeClass('hidden');
    // }

    function postComment(postId: string, reply: boolean = false, replyCommentId: string | undefined = undefined) {
        var text = ''
        if (reply) {
            text = $("#reply_form-" + replyCommentId).val() as string;
        } else {
            text = $("#new_comment_text").val() as string;
        }
        $.ajax({
            type: "POST",
            data: { comment_text: text, post_id: postId, reply: reply, reply_comment_id: replyCommentId },
            url: "comment/post_comment",
            success: function (data) {
                alert(data)
                if (data == "need_login") {
                    window.location.href = "/user/login";
                } else if (data == 'sucess') {
                    //do all the jquery adding magic
                    alert(data)
                }
            }
        });
    }

    function vote(commentId: string, action: number) {
        $.ajax({
            type: "POST",
            data: { commentid: commentId, votevalue: action },
            url: "comment/vote_comment",
            success: function (data) {
                if (data.response == "success") {
                    $('#comment_count_span-' + commentId).html(data.newNetVote)
                }
            }
        });
    }

    return (
        <div id={`reply-${id}`} className='reply_div'>
            <Stack direction={'row'}>
                <Typography className='user_link_comment_container'><a className='user_link_comment' href={`/user/account/${userId}`}>{userId}</a></Typography>
                <Typography className='comment_date'> &nbsp; {createdAt} ago wrote:</Typography>
            </Stack>
            {!showThread &&
                <a onClick={() => setShowThread(true)} className='expand-comment-link' id={`expand-comment-${id}`}>
                    <i className="fa fa-chevron-down"></i>
                </a>
            }
            {showThread &&
                <>
                    <div className='comment_side_bar' id={`comment_side_bar-${id}`}>
                        <a onClick={() => setShowThread(false)} className='hide_thread_link' />
                    </div>
                    <div id={`comment_contents-${id}`} className='comment_contents'>
                        <Box p={1} pl={2.5}  >
                            <Typography gutterBottom className='comment_text'>{body}</Typography>
                            <Stack gap={0.5} direction={'row'}>
                                <Button  size={'small'} variant='outlined' onClick={() => setShowReply(!showReply)} className='reply_Button'>
                                    
                                        <i className="fa fa-comment"></i>
                                        &nbsp; comment
                                    
                                </Button>

                                <Button sx={{p:0, minWidth:'1.75rem'}} size={'small'} variant='outlined' onClick={() => vote(id, -1)} className='downvote_Button'>
                                    <i className="fa fa-arrow-down"></i>
                                </Button>

                                <span id={`comment_count_span-${id}`} className='comment_count_span'>
                                    {netVote}
                                </span>

                                <Button sx={{p:0, minWidth:'1.75rem'}} size={'small'} variant='outlined' onClick={() => vote(id, 1)} className='upvote_Button'>
                                    <i className="fa fa-arrow-up"></i>
                                </Button>

                            </Stack>

                            {showReply &&
                                <>
                                    <Stack alignItems={'flex-start'} spacing={1} pt={1} id={`reply_box-${id}`}>
                                        <TextField fullWidth id={`reply_form-${id}`} label="Comment" variant="outlined" />
                                        <Button variant='outlined' onClick={() => postComment(postId, true, id)} className='post_reply_Button'>
                                            Post
                                        </Button>
                                    </Stack>
                                </>
                            }
                        </Box>
                        <div className='reply_container_div'>
                            {replies && replies.map(comment => <Comment key={comment.id} {...comment} />)}
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

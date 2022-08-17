import React from 'react';
import $ from "jquery";

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'


import './styles/comment.scss';

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


    function showReply(commentId: string) {
        console.log(commentId)
        $('#reply_box-' + commentId).css('display', 'inline-block');
    }

    function hideThread(commentId: string) {
        console.log(commentId)
        $('#expand-comment-' + commentId).removeClass('hidden');
        $('#comment_contents-' + commentId).addClass('hidden');
        $('#comment_side_bar-' + commentId).addClass('hidden');
    }

    function expandThread(commentId: string) {
        $('#expand-comment-' + commentId).addClass('hidden');
        $('#comment_contents-' + commentId).removeClass('hidden');
        $('#comment_side_bar-' + commentId).removeClass('hidden');
    }

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
            <a onClick={() => expandThread(id)} className='expand-comment-link hidden' id={`expand-comment-${id}`}>
                <i className="fa fa-chevron-down"></i>
            </a>
            <div className='comment_side_bar' id={`comment_side_bar-${id}`}>
                <a onClick={() => hideThread(id)} className='hide_thread_link' />
            </div>
            <div id={`comment_contents-${id}`} className='comment_contents'>
                <Card variant='outlined' elevation={2} className='comment_details'>
                    <Typography className='user_link_comment_container'>User: <a className='user_link_comment' href={`/user/account/${userId}`}>{userId}</a></Typography>
                    <Typography className='comment_date'> &nbsp; {createdAt} ago wrote:</Typography>
                    <Typography className='comment_text'>{body}</Typography>

                    <Button onClick={() => showReply(id)} className='reply_Button'>
                        <i className="fa fa-reply"></i>
                    </Button>

                    <Button onClick={() => vote(id, -1)} className='downvote_Button'>
                        <i className="fa fa-minus"></i>
                    </Button>

                    <span id={`comment_count_span-${id}`} className='comment_count_span'>
                        {netVote}
                    </span>

                    <Button onClick={() => vote(id, 1)} className='upvote_Button'>
                        <i className="fa fa-plus"></i>
                    </Button>

                    <br />
                    <div className='reply_box' id={`reply_box-${id}`}>
                        <div className='reply_user_color_div'>
                            <div className='reply_utilities_div'>
                                <textarea name='comment_text' id={`reply_form-${id}`} className='reply_form_textarea' cols={120} rows={8}></textarea>
                                <Button onClick={() => postComment(postId, true, id)} className='post_reply_Button'>
                                    Post
                                </Button>
                                <br />
                            </div>
                        </div>
                    </div>
                </Card>
                <div className='reply_container_div'>
                    {replies && replies.map(comment => <Comment key={comment.id} {...comment} />)}
                </div>
            </div>
        </div>
    )
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './comment.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import $ from "jquery";


type Comment = {
  id: string;
  userId: string;
  postId: string;
  body: string;
  netVote: number;
  replies: Array<Comment> | undefined;
  createdAt: string | undefined;
} 

var Comment = ({ id, userId, replies, createdAt, body, postId, netVote }: Comment) => {


  function showReply(comment_id) {
    console.log(comment_id)
    $('#reply_box-' + comment_id).css('display', 'inline-block');
  }
  
  function hideThread(comment_id) {
    console.log(comment_id)
    $('#expand-comment-' + comment_id).removeClass('hidden');
    $('#comment_contents-' + comment_id).addClass('hidden');
  }

  function expandThread(comment_id) {
    $('#expand-comment-' + comment_id).addClass('hidden');
    $('#comment_contents-' + comment_id).removeClass('hidden');
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

  function vote(comment_id, action) {
    $.ajax({
      type: "POST",
      data: { commentid: comment_id, votevalue: action },
      url: "comment/vote_comment",
      success: function (data) {
        if (data.response == "success") {
          $('#comment_count_span-' + comment_id).html(data.newNetVote)
        }
      }
    });
  }

  return (
    <div id={`reply-${id}`} className='reply_div'>
      <a onClick={() => expandThread(id)} className='expand-comment-link hidden' id={`expand-comment-${id}`}>
        <img src='images/expand.png' />
      </a>
      <div className='comment_side_bar' id={`comment_side_bar-${id}`}>
        <a onClick={() => hideThread(id)} className='hide_thread_link' />
      </div>
      <div id={`comment_contents-${id}`} className='comment_contents'>
        <div className='comment_details'>
          <p className='user_link_comment_container'>User: <a className='user_link_comment' href={`/user/account/${userId}`}>{userId}</a></p>
          <p className='comment_date'> &nbsp; {createdAt} ago wrote:</p>
          <p className='comment_text'>{body}</p>
          <button onClick={() => showReply(id)} className='reply_button'></button>
          <button onClick={() => vote(id, 1)} className='upvote_button'></button>
          <span id={`comment_count_span-${id}`} className='comment_count_span'>{netVote}</span>
          <button onClick={() => vote(id, -1)} className='downvote_button'>
          </button>
          <br />
          <div className='reply_box' id={`reply_box-${id}`}>
            <div className='reply_user_color_div'>
              <div className='reply_utilities_div'>
                <textarea name='comment_text' id={`reply_form-${id}`} className='reply_form_textarea' cols={120} rows={8}></textarea>
                <button onClick={() => postComment(postId, true, id)} className='post_reply_button'>
                  Post
                </button>
                <br />
              </div>
            </div>
          </div>
        </div>
        <div className='reply_container_div'>
          {replies && replies.map(comment => <Comment key={comment.id} {...comment} />)}
        </div>
      </div>
    </div>
  )
}


const postId = 'adfsd34234'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Comment
      id='sd23d'
      userId='sdae'
      body='Hello World'
      postId={postId}
      createdAt={'dfdf'}
      replies={
        [
          {
            id: 'sddf23d',
            userId: 'sdae',
            body: 'Hello World',
            replies: [],
            netVote : 4,
            postId : postId,
            createdAt: 'dfdf'
          },
        ]
      }
      netVote={3}
    />
    {/* <App /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

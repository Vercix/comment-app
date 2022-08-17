import logo from './logo.svg';
import './App.css';

import { Comment } from './components/Comment'


const postId = 'adfsd34234'
function App() {
  return (
    <div className="App">
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
              replies: [
                {
                  id: 'sddd',
                  userId: 'sdae',
                  body: 'Hello World',
                  replies: [],
                  netVote: 4,
                  postId: postId,
                  createdAt: 'dfdf'
                },
                {
                  id: 'sdddddd',
                  userId: 'sdae',
                  body: 'Hello World',
                  replies: [],
                  netVote: 4,
                  postId: postId,
                  createdAt: 'dfdf'
                },
              ],
              netVote: 4,
              postId: postId,
              createdAt: 'dfdf'
            },
            {
              id: 'sddfdffd',
              userId: 'sdae',
              body: 'Hello World',
              replies: [],
              netVote: 4,
              postId: postId,
              createdAt: 'dfdf'
            },
          ]
        }
        netVote={3}
      />
    </div>
  );
}

export default App;

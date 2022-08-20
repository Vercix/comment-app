
import { useEffect, useState } from 'react';

import './App.css';
import { Comment } from './components/Comment'
import React from 'react';


type CommentType = {
  id: string,
  userId: string,
  body: string,
  postId: string,
  createdAt: string,
  replies: Array<CommentType>,
  netVote: number,
}

const postId = 'adfsd34234'
const templateComment: CommentType = {
  id: '_______',
  userId: 'Fred',
  body: 'Hello World',
  postId: postId,
  createdAt: '5 mins',
  replies: [],
  netVote: 0,
}

const loremIpsum : string[] =
`
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor maximus quam in varius. Nullam sagittis scelerisque velit eu efficitur. Maecenas pellentesque vulputate diam, a rhoncus risus posuere vel. Sed id sem a justo rutrum accumsan. Suspendisse ac lectus sapien. Quisque suscipit neque a iaculis tristique. In id magna sed nisl imperdiet placerat quis porttitor metus. Pellentesque lobortis felis vel neque rhoncus, ut sagittis tellus iaculis. Cras imperdiet mi sit amet molestie faucibus. Aliquam hendrerit ex id metus ultricies vehicula. Curabitur faucibus neque est, sollicitudin ornare diam pharetra nec. Maecenas sed leo dolor.
Praesent tempor odio id leo tincidunt commodo. Sed in varius dolor. Fusce molestie nec arcu in pharetra. Nunc facilisis orci turpis, a vulputate lectus suscipit sed. Pellentesque neque ipsum, gravida vitae nulla vitae, sagittis gravida nisi. Sed sit amet cursus odio. Vivamus non bibendum libero. Nulla quis nulla consectetur, pharetra lectus quis, faucibus dui. Nulla nec dui urna. Curabitur ut fringilla justo. Maecenas non mi eu risus eleifend condimentum nec id orci. Nullam a ultricies mauris, at feugiat ex. Pellentesque tristique erat erat, quis dictum tortor elementum sit amet. Fusce pretium luctus sem viverra scelerisque. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
`.split(' ') ;

function App() {
  const [commentTree, setCommentTree] = useState(templateComment);

  useEffect(() => {
    const existingIDs: string[] = [];
    const getRandomLetters = (length = 1) => Array(length).fill(undefined).map(e => String.fromCharCode(Math.floor(Math.random() * 26) + 65)).join('');
    const getRandomDigits = (length = 1) => Array(length).fill(undefined).map(e => Math.floor(Math.random() * 10)).join('');
    const generateUniqueID = () => {
      let id = getRandomLetters(3) + getRandomDigits(6);
      while (existingIDs.includes(id)) id = getRandomLetters(2) + getRandomDigits(4);
      return id;
    };

    const generateComment = (numReplies = 4): CommentType => {
      const newComment = structuredClone(templateComment)
      console.log("__________________________________________")
      newComment.id = generateUniqueID();
      newComment.userId = getRandomLetters((Math.floor(Math.random() * 10)) + 1);
      newComment.body = '' + loremIpsum.slice(0, (Math.floor(Math.random() * 100))).join(' ');
      newComment.netVote = (Math.floor(Math.random() * 100));

      for(let x : number = 0; x < numReplies; x++) {
        newComment.replies.push(generateComment(numReplies - (Math.floor(Math.random() * 10)) ));
      }
      if (numReplies > 0) {
      }

      return newComment;
    }

    setCommentTree(generateComment());
    console.log(generateComment())
  }
    , [])


  return (
    <div className="App">
      <Comment
        {...commentTree}
      />
    </div>
  );
}

export default App;

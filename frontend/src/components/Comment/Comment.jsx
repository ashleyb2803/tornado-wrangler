// components/CommentSection.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CommentSection({ eventId, currentUserId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get(`/api/comments/event/${eventId}`).then(res => setComments(res.data));
  }, [eventId]);

  const addComment = async () => {
    const res = await axios.post(`/api/comments/${eventId}`, { text }, { withCredentials: true });
    setComments([...comments, res.data]);
    setText('');
  };

  const deleteComment = async (id) => {
    await axios.delete(`/api/comments/${id}`, { withCredentials: true });
    setComments(comments.filter(c => c._id !== id));
  };

  return (
    <div>
      {comments.map(comment => (
        <div key={comment._id}>
          <p>{comment.text}</p>
          {comment.user === currentUserId && (
            <button onClick={() => deleteComment(comment._id)}>Delete</button>
          )}
        </div>
      ))}
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addComment}>Post Comment</button>
    </div>
  );
}

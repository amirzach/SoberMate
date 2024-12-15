import React, { useState, useEffect } from 'react';
import './blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [username] = useState(localStorage.getItem('username') || 'Guest');
  const [showModal, setShowModal] = useState(false);  // State to control the modal visibility

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch all posts
  const fetchPosts = async () => {
    const response = await fetch('http://localhost:5000/api/posts');
    const data = await response.json();
    setPosts(data);
  };

  // Add a new post
  const handleAddPost = async () => {
    if (!newPost.trim()) return;

    const response = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, content: newPost }),
    });

    const data = await response.json();
    setPosts([data, ...posts]);
    setNewPost('');
    setShowModal(false);  // Close the modal after posting
  };

  // Like a post
  const handleLike = async (id) => {
    const response = await fetch(`http://localhost:5000/api/posts/${id}/like`, { method: 'POST' });
    const updatedPost = await response.json();
    setPosts(posts.map(post => (post._id === id ? updatedPost : post)));
  };

  // Add a comment
  const handleAddComment = async (id, comment) => {
    const response = await fetch(`http://localhost:5000/api/posts/${id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, text: comment }),
    });

    const updatedPost = await response.json();
    setPosts(posts.map(post => (post._id === id ? updatedPost : post)));
  };

  return (
    <div className="container">
      <h1>Sober Mate Blog</h1>

      {/* Display Posts */}
      <div className="posts-container">
        {posts.map((post) => (
          <div key={post._id} className="post">
            <h3>{post.username}</h3>
            <p>{post.content}</p>
            <div>
              <button onClick={() => handleLike(post._id)} className="like-button">
                ❤️ {post.likes}
              </button>
            </div>

            {/* Comments */}
            <div className="comments">
              <h4>Comments</h4>
              {post.comments.map((comment, index) => (
                <p key={index}><strong>{comment.username}:</strong> {comment.text}</p>
              ))}
              <input
                type="text"
                placeholder="Add a comment"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleAddComment(post._id, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Floating Button for Adding a New Post */}
      <div className="floating-btn-container">
        <button className="floating-btn" onClick={() => setShowModal(true)}>
          <span className="plus-icon">+</span>
        </button>
      </div>

      {/* Modal for Adding a New Post */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create a New Post</h2>
            <textarea
              placeholder="Share your thoughts..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            ></textarea>
            <div className="modal-actions">
              <button onClick={handleAddPost}>Post</button>
              <button onClick={() => setShowModal(false)} className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;

import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";
const BlogForm = ({ setMessage, setNewBlogOpen, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await blogService.create({ title, author, url });
      setMessage(`a new blog ${title} by ${author} added`);

      const blogs = await blogService.getAll();
      setBlogs(blogs);
      setTitle("");
      setAuthor("");
      setUrl("");
      setNewBlogOpen(false);
    } catch (exception) {
      console.error(exception);
      setMessage("Failed to create blog");
    }
  };

  BlogForm.propTypes = {
    setMessage: PropTypes.func.isRequired,
    setNewBlogOpen: PropTypes.func.isRequired,
    setBlogs: PropTypes.func.isRequired,
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>create new</h2>
      <div>
        <label>title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>author:</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        <label>url:</label>
        <input value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>
      <button type="submit">create</button>
      <br />
      <button onClick={() => setNewBlogOpen(false)}>cancel</button>
    </form>
  );
};

export default BlogForm;

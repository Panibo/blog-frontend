import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs }) => {
  const [open, setOpen] = useState(false);

  const handleLike = async () => {
    console.log(blog.id);
    await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 });
    const blogs = await blogService.getAll();
    setBlogs(() => [...blogs].sort((a, b) => b.likes - a.likes));
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      const blogs = await blogService.getAll();
      setBlogs(() => [...blogs].sort((a, b) => b.likes - a.likes));
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      {blog.title}{" "}
      <button onClick={() => setOpen(!open)}>{open ? "hide" : "view"}</button>
      {open && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.author}</div>
          <button onClick={handleRemove}>remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;

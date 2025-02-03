import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [newBlogOpen, setNewBlogOpen] = useState(false);
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(() => [...blogs].sort((a, b) => b.likes - a.likes))
      );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  if (user !== null) {
    return (
      <div>
        <h2>blogs</h2>
        {message && <h2 style={{ color: "red" }}>{message}</h2>}
        {user?.name} logged in{" "}
        <button
          onClick={() => {
            window.localStorage.removeItem("user");
            setUser(null);
          }}
        >
          logout
        </button>
        <br />
        {newBlogOpen && (
          <BlogForm
            setMessage={setMessage}
            setNewBlogOpen={setNewBlogOpen}
            setBlogs={setBlogs}
          />
        )}
        {!newBlogOpen && (
          <button onClick={() => setNewBlogOpen(true)}>new blog</button>
        )}
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
        ))}
      </div>
    );
  }
  return <LoginForm setUser={setUser} />;
};

export default App;

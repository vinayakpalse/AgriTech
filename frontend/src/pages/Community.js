import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch logged-in user details from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (!newPost.trim() && !selectedImage) return;

    if (!user) {
      console.error("User not logged in.");
      return;
    }

    setIsPosting(true);
    try {
      const formData = new FormData();
      formData.append("content", newPost);
      formData.append("user", user._id); // ✅ Use logged-in user ID
      if (selectedImage) formData.append("image", selectedImage);

      const response = await axios.post("http://localhost:5000/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPosts([response.data, ...posts]);
      setNewPost("");
      setSelectedImage(null);
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setIsPosting(false);
    }
  };

  const handleEdit = async (postId) => {
    if (!editingContent.trim()) return;

    try {
      const response = await axios.put(`http://localhost:5000/api/posts/${postId}`, {
        content: editingContent,
      });
      setPosts(posts.map(post => (post._id === postId ? response.data : post)));
      setEditingPostId(null);
      setEditingContent("");
    } catch (err) {
      console.error("Error editing post:", err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-lg">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet. Be the first to share!</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              {editingPostId === post._id ? (
                <>
                  <textarea
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    placeholder="Edit your post..."
                    rows="3"
                  />
                  <button
                    onClick={() => handleEdit(post._id)}
                    className="mt-2 w-full text-white font-semibold py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-800">{post.content}</p>
                  {post.image && (
                    <img
                      src={`http://localhost:5000/uploads/${encodeURIComponent(post.image)}`}
                      alt="Uploaded"
                      className="mt-2 w-full rounded-lg"
                      onError={(e) => console.error("Image load error:", e)}
                    />
                  )}
                  {/* ✅ Display the correct user name */}
                  <p className="text-sm text-gray-500 mt-2">
                   Posted by {post.user?.username || "Unknown"}
                </p>

                  <div className="mt-2 flex justify-between">
                    <button onClick={() => { setEditingPostId(post._id); setEditingContent(post.content); }} className="text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(post._id)} className="text-red-500 hover:underline">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Community;

import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Heart, Trash2, Send, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../App';
import Navbar from '../components/navbar'
function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { user, logout } = useAuth();

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      setLoading(true);
      const postsRef = collection(db, 'posts');
      const q = query(postsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
        });
      });

      setPosts(fetchedPosts);
      setError('');
    } catch (err) {
      setError('Failed to load posts: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreatePost(e) {
    e.preventDefault();

    if (!user) {
      setError('Please sign in to create a post');
      return;
    }

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        title: title.trim(),
        content: content.trim(),
        authorId: user.uid,
        authorName: user.displayName || user.email.split('@')[0],
        authorEmail: user.email,
        createdAt: serverTimestamp(),
        likes: 0
      });

      setTitle('');
      setContent('');
      setSuccess('Post created successfully!');
      setError('');

      await fetchPosts();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to create post: ' + err.message);
      console.error(err);
    }
  }

  async function handleDeletePost(postId) {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'posts', postId));
      await fetchPosts();
      setSuccess('Post deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete post: ' + err.message);
      console.error(err);
    }
  }

  function formatDate(timestamp) {
    if (!timestamp) return 'Just now';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"></div>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">

          {/* Left Sidebar - Create Post/User Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Community Posts</h2>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              {user ? (
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 dark:bg-gray-700 text-xl font-bold text-blue-600 dark:text-white">
                      {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{user.displayName || user.email}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                    </div>
                    <button onClick={logout} className="ml-auto flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                  <hr className="mb-4 border-gray-200 dark:border-gray-700" />
                  <form onSubmit={handleCreatePost} className="">
                    <div className="mb-2">
                      <label htmlFor="title" className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title..."
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="content" className="block font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                      <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your post content..."
                        rows="4"
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <button type="submit"
                      className={`w-full flex items-center justify-center gap-2 font-bold px-4 py-2 rounded-lg transition shadow-md ${
                        title.trim() && content.trim() 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer' 
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      }`}>
                      <Send size={18} />
                      Publish Post
                    </button>
                  </form>
                </div>
              ) : (
                <a href="/login" className="w-full inline-flex items-center gap-2 justify-center font-bold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md transition">
                  <LogIn size={18} />
                  Sign In
                </a>
              )}
              {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
              {success && <div className="mt-2 text-green-600 text-sm font-bold">{success}</div>}
            </div>
          </div>

          {/* Posts Feed - main content */}
          <div className="md:col-span-2 flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Posts</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-600 dark:text-gray-400">Loading posts...</span>
                </div>
              ) : posts.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 dark:text-gray-400">No posts yet. Be the first to create one!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <article key={post.id} className="bg-white dark:bg-gray-700 rounded-xl p-5 shadow-md border border-gray-100 dark:border-gray-600">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-gray-900 text-lg font-bold text-blue-600 dark:text-white">
                            {post.authorName?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{post.authorName}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{formatDate(post.createdAt)}</div>
                          </div>
                        </div>
                        {user && post.authorId === user.uid && (
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="p-2 rounded-full bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900 transition"
                            title="Delete post"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                      <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-1">{post.title}</h3>
                      <p className="text-gray-700 dark:text-gray-200 mb-3">{post.content}</p>
                      <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Heart size={18} />
                          <span>{post.likes || 0} like{post.likes !== 1 ? 's' : ''}</span>
                        </div>
                        {/* Example placeholder for share count */}
                        {/* <div className="flex items-center gap-1">
                          <Share size={18} />
                          <span>{post.shares || 0} shares</span>
                        </div> */}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  );
}

export default Posts;

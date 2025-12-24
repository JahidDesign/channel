"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Heart, MessageCircle, Share2, MoreHorizontal, Plus, X, Users, Image, Video, Globe, Lock, UserPlus } from "lucide-react";

/* ===================== TYPES ===================== */
type User = {
  name: string;
  bio: string;
  profileImage: string;
  coverImage: string;
  friends: number;
  photos: number;
};

type Comment = { 
  userId: string; 
  userName: string;
  text: string;
  timestamp: string;
};

type Post = {
  _id: string;
  text?: string;
  image?: string;
  video?: string;
  likes: string[];
  comments: Comment[];
  timestamp: string;
  privacy: "public" | "friends" | "private";
};

/* ===================== COMPONENTS ===================== */
function CreatePostModal({ open, onClose, onPost }) {
  const [text, setText] = useState("");
  const [privacy, setPrivacy] = useState("public");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-black">Create post</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              J
            </div>
            <div>
              <p className="font-semibold text-black">John Doe</p>
              <select 
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
                className="text-xs bg-gray-100 border-none rounded px-2 py-1 text-gray-700"
              >
                <option value="public">🌐 Public</option>
                <option value="friends">👥 Friends</option>
                <option value="private">🔒 Only me</option>
              </select>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's on your mind, John?"
            className="w-full border-none outline-none text-black resize-none h-32 text-lg"
          />

          <div className="flex gap-2 mt-4 p-3 border-2 border-gray-200 rounded-xl">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Image className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-800">Photo</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Video className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-gray-800">Video</span>
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              if (text.trim()) {
                onPost({ text, privacy });
                setText("");
                onClose();
              }
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, user, onLike, onComment }) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [localLikes, setLocalLikes] = useState(post.likes.length);

  const handleLike = () => {
    setLiked(!liked);
    setLocalLikes(liked ? localLikes - 1 : localLikes + 1);
    onLike(post._id);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      onComment(post._id, commentText);
      setCommentText("");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {user.name[0]}
            </div>
            <div>
              <p className="font-semibold text-black">{user.name}</p>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <span>{post.timestamp}</span>
                <span>·</span>
                {post.privacy === "public" && <Globe className="w-3 h-3 text-gray-600" />}
                {post.privacy === "friends" && <Users className="w-3 h-3 text-gray-600" />}
                {post.privacy === "private" && <Lock className="w-3 h-3 text-gray-600" />}
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-50 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {post.text && <p className="text-black mb-3">{post.text}</p>}
      </div>

      {post.image && (
        <img src={post.image} className="w-full object-cover" alt="" />
      )}
      
      {post.video && (
        <video src={post.video} controls className="w-full" />
      )}

      <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-700 border-b border-gray-200">
        <button className="hover:underline">
          {localLikes > 0 && `${localLikes} ${localLikes === 1 ? 'like' : 'likes'}`}
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="hover:underline"
        >
          {post.comments.length > 0 && `${post.comments.length} ${post.comments.length === 1 ? 'comment' : 'comments'}`}
        </button>
      </div>

      <div className="px-4 py-2 flex items-center justify-around border-b border-gray-200">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 py-2 px-4 hover:bg-gray-50 rounded-lg transition-all ${
            liked ? 'text-blue-600' : 'text-gray-700'
          }`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-blue-600' : ''}`} />
          <span className="font-semibold">Like</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 py-2 px-4 hover:bg-gray-50 rounded-lg transition-all text-gray-700"
        >
          <MessageCircle className="w-5 h-5 text-gray-700" />
          <span className="font-semibold">Comment</span>
        </button>
        <button className="flex items-center gap-2 py-2 px-4 hover:bg-gray-50 rounded-lg transition-all text-gray-700">
          <Share2 className="w-5 h-5 text-gray-700" />
          <span className="font-semibold">Share</span>
        </button>
      </div>

      {showComments && (
        <div className="p-4 bg-gray-50">
          <div className="space-y-3 mb-3">
            {post.comments.map((comment, idx) => (
              <div key={idx} className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {comment.userName[0]}
                </div>
                <div className="bg-gray-200 rounded-2xl px-4 py-2 flex-1">
                  <p className="font-semibold text-sm text-black">{comment.userName}</p>
                  <p className="text-gray-900">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              J
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                placeholder="Write a comment..."
                className="flex-1 bg-gray-200 text-black rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleComment}
                disabled={!commentText.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== PAGE ===================== */
export default function FacebookProfile() {
  const [user, setUser] = useState<User>({
    name: "John Doe",
    bio: "Digital Creator • Travel Enthusiast • Coffee Lover ☕",
    profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
    coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200",
    friends: 1247,
    photos: 342
  });

  const [posts, setPosts] = useState<Post[]>([
    {
      _id: "1",
      text: "Just finished an amazing hike! The views were absolutely breathtaking 🏔️",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      likes: [],
      comments: [
        { userId: "2", userName: "Sarah Johnson", text: "Looks amazing! Where is this?", timestamp: "2h ago" }
      ],
      timestamp: "5 hours ago",
      privacy: "public"
    },
    {
      _id: "2",
      text: "Coffee and code - the perfect combination for a productive morning ☕💻",
      likes: [],
      comments: [],
      timestamp: "1 day ago",
      privacy: "friends"
    },
    {
      _id: "3",
      text: "Throwback to summer vacation! Already planning the next adventure ✈️",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      likes: [],
      comments: [
        { userId: "3", userName: "Mike Chen", text: "Beach life is the best life!", timestamp: "1d ago" },
        { userId: "4", userName: "Emma Wilson", text: "Take me with you next time! 😍", timestamp: "1d ago" }
      ],
      timestamp: "3 days ago",
      privacy: "public"
    }
  ]);

  const [activeTab, setActiveTab] = useState("posts");
  const [showCreatePost, setShowCreatePost] = useState(false);

  const createPost = ({ text, privacy }) => {
    const newPost: Post = {
      _id: Date.now().toString(),
      text,
      likes: [],
      comments: [],
      timestamp: "Just now",
      privacy
    };
    setPosts([newPost, ...posts]);
  };

  const likePost = (postId: string) => {
    setPosts(posts.map(p => 
      p._id === postId 
        ? { ...p, likes: p.likes.includes("me") ? p.likes.filter(l => l !== "me") : [...p.likes, "me"] }
        : p
    ));
  };

  const commentPost = (postId: string, text: string) => {
    setPosts(posts.map(p =>
      p._id === postId
        ? {
            ...p,
            comments: [
              ...p.comments,
              { userId: "me", userName: "John Doe", text, timestamp: "Just now" }
            ]
          }
        : p
    ));
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* COVER PHOTO */}
        <div className="relative h-96 bg-gray-200 rounded-b-xl overflow-hidden">
          <img src={user.coverImage} className="w-full h-full object-cover" alt="Cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <button className="absolute bottom-4 right-4 bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-50 flex items-center gap-2 font-semibold text-black">
            <Camera className="w-4 h-4 text-black" />
            Edit cover photo
          </button>
        </div>

        {/* PROFILE INFO */}
        <div className="bg-white shadow border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between py-4 gap-4">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-24 md:-mt-16">
                <div className="relative">
                  <img
                    src={user.profileImage}
                    className="w-40 h-40 rounded-full border-4 border-white shadow-xl object-cover"
                    alt="Profile"
                  />
                  <button className="absolute bottom-2 right-2 bg-white border border-gray-300 p-2 rounded-full hover:bg-gray-50">
                    <Camera className="w-5 h-5 text-black" />
                  </button>
                </div>
                <div className="text-center md:text-left mb-4 md:mb-2">
                  <h1 className="text-3xl font-bold text-black">{user.name}</h1>
                  <p className="text-gray-700 mt-1">{user.bio}</p>
                  <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm text-gray-700">
                    <span className="font-semibold">{user.friends} friends</span>
                    <span className="font-semibold">{user.photos} photos</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add to Story
                </button>
                <button className="bg-white border border-gray-300 hover:bg-gray-50 text-black px-6 py-2 rounded-lg font-semibold">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* NAVIGATION TABS */}
            <div className="flex gap-2 border-t border-gray-200 mt-2">
              <button
                onClick={() => setActiveTab("posts")}
                className={`px-6 py-4 font-semibold border-b-4 transition-colors ${
                  activeTab === "posts"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-700 hover:bg-gray-50"
                }`}
              >
                Posts
              </button>
              <button
                onClick={() => setActiveTab("about")}
                className={`px-6 py-4 font-semibold border-b-4 transition-colors ${
                  activeTab === "about"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-700 hover:bg-gray-50"
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab("friends")}
                className={`px-6 py-4 font-semibold border-b-4 transition-colors ${
                  activeTab === "friends"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-700 hover:bg-gray-50"
                }`}
              >
                Friends
              </button>
              <button
                onClick={() => setActiveTab("photos")}
                className={`px-6 py-4 font-semibold border-b-4 transition-colors ${
                  activeTab === "photos"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-700 hover:bg-gray-50"
                }`}
              >
                Photos
              </button>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* LEFT SIDEBAR */}
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                <h2 className="font-bold text-black mb-3">Intro</h2>
                <p className="text-gray-800 text-center mb-4">{user.bio}</p>
                <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-black py-2 rounded-lg font-semibold">
                  Edit Bio
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-black">Photos</h2>
                  <button className="text-blue-600 hover:underline text-sm">See all</button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg" />
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-black">Friends</h2>
                  <button className="text-blue-600 hover:underline text-sm">See all</button>
                </div>
                <p className="text-gray-700 text-sm mb-3">{user.friends} friends</p>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i}>
                      <div className="aspect-square bg-gray-200 rounded-lg mb-1" />
                      <p className="text-xs text-black truncate">Friend {i}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MAIN FEED */}
            <div className="md:col-span-2 space-y-4">
              {/* CREATE POST */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    J
                  </div>
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-3 text-left text-gray-600"
                  >
                    What's on your mind, John?
                  </button>
                </div>
                <div className="flex items-center justify-around mt-4 pt-4 border-t border-gray-200">
                  <button className="flex items-center gap-2 py-2 px-4 hover:bg-gray-50 rounded-lg text-gray-800">
                    <Video className="w-5 h-5 text-red-500" />
                    <span className="font-semibold">Live video</span>
                  </button>
                  <button className="flex items-center gap-2 py-2 px-4 hover:bg-gray-50 rounded-lg text-gray-800">
                    <Image className="w-5 h-5 text-green-500" />
                    <span className="font-semibold">Photo/video</span>
                  </button>
                </div>
              </div>

              {/* POSTS */}
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  user={user}
                  onLike={likePost}
                  onComment={commentPost}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <CreatePostModal
        open={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onPost={createPost}
      />
    </div>
  );
}
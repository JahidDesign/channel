export const mockProfile = {
  name: "John Doe",
  email: "john@email.com",
  avatar: "/avatar.jpg",
  posts: 3,
  followers: 120,
  following: 90,
  postsList: [
    {
      id: 1,
      type: "text",
      content: "Hello world",
    },
    {
      id: 2,
      type: "image",
      media: ["/p1.jpg", "/p2.jpg"],
    },
    {
      id: 3,
      type: "video",
      media: "/video.mp4",
    },
  ],
};

/* ================= TYPES ================= */

export type UserPost = {
  id: number;
  type: "image" | "video" | "text";
  media?: string[] | string;
  content?: string;
};

export type UserProfile = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  posts: number;
  followers: number;
  following: number;
  postsList: UserPost[];
};

/* ================= API (MOCK) ================= */

export async function getProfile(): Promise<UserProfile> {
  // simulate API delay
  await new Promise((res) => setTimeout(res, 150));

  return {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/300?img=12",
    bio: "Digital journalist and senior news editor.",
    posts: 9,
    followers: 1240,
    following: 180,
    postsList: [
      {
        id: 1,
        type: "image",
        media: ["https://picsum.photos/seed/post1/600/600"],
      },
      {
        id: 2,
        type: "image",
        media: ["https://picsum.photos/seed/post2/600/600"],
      },
      {
        id: 3,
        type: "video",
        media: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: 4,
        type: "text",
        content: "Breaking news coverage directly from the field.",
      },
      {
        id: 5,
        type: "image",
        media: ["https://picsum.photos/seed/post3/600/600"],
      },
      {
        id: 6,
        type: "text",
        content: "Journalism must always serve the truth.",
      },
      {
        id: 7,
        type: "image",
        media: ["https://picsum.photos/seed/post4/600/600"],
      },
      {
        id: 8,
        type: "video",
        media: "https://www.w3schools.com/html/movie.mp4",
      },
      {
        id: 9,
        type: "image",
        media: ["https://picsum.photos/seed/post5/600/600"],
      },
    ],
  };
}

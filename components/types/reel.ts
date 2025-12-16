export type Reel = {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  text?: string;
  videoUrl?: string;
  imageUrl?: string;
  createdAt: string;
};

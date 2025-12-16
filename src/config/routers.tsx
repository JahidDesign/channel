// src/config/routers.jsx

const ROUTES = {
  // ===== PUBLIC =====
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  // ===== USER =====
  PROFILE: '/profile',

  // ===== CONTENT =====
  REELS: '/reels',
  CHAT: '/chat',          

  // ===== CATEGORY =====
  CATEGORY: (slug) => `/category/${slug}`,
};

export default ROUTES;

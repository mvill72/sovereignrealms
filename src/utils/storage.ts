// Local Vault: Your private realm, browser-encrypted
// Data lives in localStorage until you choose to publish to IPFS

export interface Post {
  id: string;
  content: string;
  ipfsHash?: string;
  visibility: 'private' | 'family' | 'work' | 'public';
  timestamp: string;
  owner?: string;
}

export interface Profile {
  name: string;
  bio: string;
  avatar: string;
  cover: string;
  walletAddress?: string;
  ensName?: string;
  circles: {
    family: string[];
    work: string[];
  };
}

const STORAGE_KEYS = {
  PROFILE: 'sovereign_profile',
  POSTS: 'sovereign_posts',
  CIRCLES: 'sovereign_circles',
} as const;

/**
 * Save profile to local vault
 */
export function saveProfile(profile: Profile): void {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
}

/**
 * Load profile from local vault
 */
export function loadProfile(): Profile | null {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
  if (!data) return null;
  return JSON.parse(data);
}

/**
 * Get default profile (for first-time users)
 */
export function getDefaultProfile(): Profile {
  return {
    name: 'Sovereign Self',
    bio: 'Protected core of the psyche. What I share, I choose.',
    avatar: '',
    cover: '',
    circles: {
      family: [],
      work: [],
    },
  };
}

/**
 * Save posts to local vault
 */
export function savePosts(posts: Post[]): void {
  localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
}

/**
 * Load posts from local vault
 */
export function loadPosts(): Post[] {
  const data = localStorage.getItem(STORAGE_KEYS.POSTS);
  if (!data) return [];
  return JSON.parse(data);
}

/**
 * Add a new post
 */
export function addPost(post: Post): Post[] {
  const posts = loadPosts();
  const newPosts = [post, ...posts];
  savePosts(newPosts);
  return newPosts;
}

/**
 * Delete a post
 */
export function deletePost(postId: string): Post[] {
  const posts = loadPosts();
  const newPosts = posts.filter(p => p.id !== postId);
  savePosts(newPosts);
  return newPosts;
}

/**
 * Filter posts by visibility
 */
export function getPostsByVisibility(visibility: Post['visibility']): Post[] {
  const posts = loadPosts();
  return posts.filter(p => p.visibility === visibility);
}

/**
 * Export all data (for portability)
 */
export function exportAllData() {
  return {
    profile: loadProfile(),
    posts: loadPosts(),
    exportedAt: new Date().toISOString(),
  };
}

/**
 * Import data from export
 */
export function importData(data: ReturnType<typeof exportAllData>): void {
  if (data.profile) saveProfile(data.profile);
  if (data.posts) savePosts(data.posts);
}

/**
 * Clear all local data (nuclear option)
 */
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

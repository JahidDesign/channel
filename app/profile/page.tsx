import { getProfile } from "../../components/lib/api";

export default async function ProfilePage() {
  const user = await getProfile();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-32 w-32 rounded-full border object-cover"
          />

          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold">{user.name}</h1>
              <button className="rounded-lg border px-4 py-1.5 text-sm hover:bg-slate-100">
                Edit Profile
              </button>
            </div>

            <div className="mt-4 flex gap-6 text-sm">
              <span>
                <strong>{user.posts}</strong> posts
              </span>
              <span>
                <strong>{user.followers}</strong> followers
              </span>
              <span>
                <strong>{user.following}</strong> following
              </span>
            </div>

            <div className="mt-4 text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-slate-600">{user.bio ?? "No bio yet"}</p>
              <p className="text-slate-500">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="my-8 border-t" />

        {/* ================= POSTS GRID ================= */}
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {user.postsList.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square overflow-hidden bg-black"
            >
              {/* IMAGE */}
              {post.type === "image" && post.media && (
                <img
                  src={(post.media as string[])[0]}
                  className="h-full w-full object-cover"
                />
              )}

              {/* VIDEO */}
              {post.type === "video" && (
                <video
                  src={post.media as string}
                  className="h-full w-full object-cover"
                  muted
                  controls={false}
                />
              )}

              {/* TEXT */}
              {post.type === "text" && (
                <div className="flex h-full w-full items-center justify-center bg-slate-900 p-4 text-center text-sm text-white">
                  {post.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ================= DEBUG JSON ================= */}
        <pre className="mt-8 overflow-auto rounded-lg bg-black p-4 text-xs text-green-400">
          {JSON.stringify(user.postsList, null, 2)}
        </pre>

      </div>
    </div>
  );
}

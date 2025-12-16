import UploadForm from "../../components/UploadForm";

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Create a Post
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Share text, photos, or a short video (max 3 minutes)
          </p>
        </div>

        {/* Upload Card */}
        <UploadForm />
      </div>
    </div>
  );
}

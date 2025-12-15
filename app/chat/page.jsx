import { FaComments } from 'react-icons/fa';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow p-4 flex items-center gap-2">
        <FaComments className="text-blue-600" />
        <h1 className="font-bold text-lg">Chat</h1>
      </header>

      <div className="flex-1 flex items-center justify-center text-gray-400">
        Chat system coming soon...
      </div>
    </div>
  );
}

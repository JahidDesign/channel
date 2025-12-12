export default function TopBar() {
  const dateStr = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="hidden lg:block bg-gray-50 border-b text-sm">
      <div className="container-desktop px-4 py-2 flex justify-between items-center">
        
       
        <div className="text-gray-600 flex items-center gap-3">
          <span>Dhaka</span>
          <span className="text-gray-400">•</span>
          <span>{dateStr}</span>
        </div>

        
        <div className="flex items-center gap-3">

          
          <a
            className="text-red-600 text-xs px-3 py-1 border border-red-600 rounded font-semibold"
            href="#"
          >
            LIVE
          </a>

          
          <div className="flex gap-3">

            
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded flex items-center justify-center bg-blue-600"
            >
              <svg
                fill="white"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M22 12.07C22 6.49 17.52 2 11.93 2 6.35 2 2 6.49 2 12.07c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.83c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.64.77-1.64 1.56v1.87h2.79l-.45 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.93z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#"
              aria-label="YouTube"
              className="w-8 h-8 rounded flex items-center justify-center bg-red-600"
            >
              <svg
                fill="white"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M23.5 6.2s-.2-1.7-.9-2.4c-.9-.9-1.9-.9-2.4-1C16.9 2.5 12 2.5 12 2.5h-.1s-4.9 0-8.2.3c-.5.1-1.5.1-2.4 1-.7.7-.9 2.4-.9 2.4S0 8.1 0 10v1.9c0 1.9.2 3.8.2 3.8s.2 1.7.9 2.4c.9.9 2 .9 2.5 1 1.8.2 7.5.3 7.5.3s4.9 0 8.2-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.4.9-2.4s.2-1.9.2-3.8V10c0-1.9-.2-3.8-.2-3.8zM9.7 14.6V7.4l6.4 3.6-6.4 3.6z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="#"
              aria-label="Twitter X"
              className="w-8 h-8 rounded flex items-center justify-center bg-black"
            >
              <svg
                fill="white"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M19.8 3H16l-4 4-4-4H4.2L9 8.8 3 15.7h3.8l4.2-4.3 4.2 4.3H19l-6-6.9 6.8-6.8z" />
              </svg>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}

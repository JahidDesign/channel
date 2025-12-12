import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#f3f3f3] border-t mt-10">
      
      {/* Top Footer */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">

        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="https://i.ibb.co.com/5WcRvpVG/Untitled-design.png" 
            alt="Channel 24"
            width={160}
            height={70}
            className="object-contain"
          />
        </div>

        {/* Contact Section */}
        <div className="text-center md:text-left space-y-1 text-sm">
          <p><strong>Email:</strong> channel24central@gmail.com</p>
          <p><strong>Phone:</strong> +8802 550 29724</p>
          <p><strong>Fax:</strong> +8802 550 19709</p>
          <p><strong>Advertisement:</strong> digital@channel24bd.tv</p>
        </div>

        {/* Publisher Section */}
        <div className="text-center md:text-left text-sm">
          <p className="font-semibold mb-2">Editor & Publisher:</p>
          <p>
            Tiger Media Building (10th & 11th Floor),  
            687 South Tejgaon Commercial Area,  
            Dhaka 1208, Bangladesh.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t"></div>

      {/* Bottom Bar */}
      <div className="bg-[#e5e5e5] text-center py-3 text-sm text-gray-700">
        © {new Date().getFullYear()} | All Rights Reserved by Channel 24
      </div>
    </footer>
  );
}

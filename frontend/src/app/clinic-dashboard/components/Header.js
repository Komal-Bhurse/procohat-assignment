"use client";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b mb-5 border-gray-200">
      <div className="flex">
        {/* Logo Section - Same width and background as sidebar */}
        <div className="hidden lg:flex w-64 bg-blue-400 items-center px-6 py-4">
          <h1 className="text-xl font-bold text-white">TANWISH</h1>
        </div>
        
        {/* Rest of header content */}
        <div className="flex-1 px-4 md:px-6 py-4">
          <div className="flex items-center justify-end gap-4">
            
            {/* Right side buttons and user profile */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* User Profile */}
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">Thomas Anree</p>
                  <p className="text-xs text-gray-500">UX Designer</p>
                </div>
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-500 font-semibold">TA</span>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}



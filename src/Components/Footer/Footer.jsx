import React from "react";

function Footer() {
  return (
    <>
      <footer className="bg-black text-white px-[8%] lg:px-[12%] pt-1 pb-10 font-[var(--Plus-Jakarta-font)]">
        {/* Navigation Links */}
        <div className="mx-auto flex flex-wrap justify-center items-center gap-4 text-base pb-6">
          {["Home", "About Us", "Showroom", "Help"].map(
            (link, i) => (
              <React.Fragment key={i}>
                <a
                  href="#"
                  className="hover:text-[var(--primary-color)] transition-colors"
                >
                  {link}
                </a>
                {i <3 && <span className="text-gray-500">|</span>}
              </React.Fragment>
            )
          )}
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-4">
          {[
            { icon: "ri-instagram-line", url: "#" },
            { icon: "ri-facebook-circle-fill", url: "#" },
            { icon: "ri-linkedin-fill", url: "#" },
            { icon: "ri-youtube-fill", url: "#" },
          ].map(({ icon, url }, idx) => (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[40px] w-[40px] flex items-center justify-center rounded-full border border-gray-400 hover:bg-[var(--primary-color)] hover:text-white transition-all duration-300"
            >
              <i className={`${icon} text-xl`}></i>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          © 2025 Car WebSite. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Footer;

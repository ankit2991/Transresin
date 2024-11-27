import React, { useState, useRef } from "react";
import { FaAngleDown } from "react-icons/fa6";

const Dropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef(null);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === null || prev === items.length - 1 ? 0 : prev + 1
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === null || prev === 0 ? items.length - 1 : prev - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex !== null) {
          console.log("Selected:", items[selectedIndex]);
          setIsOpen(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="grid">
        <button
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          className="text-primary-300 border-2 border-primary-300 font-bold bg-white px-1 py-1 lg:px-4 lg:py-2 rounded-lg flex items-center text-xs lg:text-base "
        >
          {items[selectedIndex]}
          <FaAngleDown className="ms-auto" />
        </button>
      </div>

      {isOpen && (
        <ul
          className="absolute bg-white border border-primary-300 rounded-lg mt-2 right-0 shadow-lg w-48 z-10 overflow-hidden"
          role="listbox"
        >
          {items.map((item, index) => (
            <li
              key={index}
              role="option"
              tabIndex={0}
              aria-selected={selectedIndex === index}
              onClick={() => {
                setSelectedIndex(index);
                setIsOpen(false);
              }}
              className={`lg:px-4 lg:py-2 px-1 py-1 lg:text-base text-xs cursor-pointer ${
                selectedIndex === index
                  ? "bg-primary-300 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

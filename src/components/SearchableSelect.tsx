"use client";

import { useState, useRef, useEffect } from "react";
import { FiSearch, FiChevronDown, FiX } from "react-icons/fi";

interface Option {
  id: string;
  label: string;
  sublabel?: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  direction?: 'up' | 'down';
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  loading = false,
  direction = "up",
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.id === value);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (opt.sublabel && opt.sublabel.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionId: string) => {
    onChange(optionId);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className={`w-full flex items-center justify-between px-3 py-3 border rounded-xl text-sm bg-white outline-none transition-all ${
          isOpen ? "ring-2 ring-[#ff7143]/20 border-[#ff7143]" : "border-gray-200"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <span className={selectedOption ? "text-gray-800 font-medium" : "text-gray-400"}>
          {loading ? "Loading..." : selectedOption ? selectedOption.label : placeholder}
        </span>
        <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className={`absolute z-50 w-full ${direction === 'up' ? 'bottom-full mb-1 border-b-0 rounded-t-xl rounded-b-none' : 'top-full mt-1 border-t-0 rounded-b-xl rounded-t-none'} bg-white border border-gray-100 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150`}>
          <div className="p-2 border-b border-gray-50 flex items-center gap-2 bg-gray-50/50">
            <FiSearch className="text-gray-400 w-4 h-4" />
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full py-1"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} type="button">
                <FiX className="w-3 h-3 text-gray-400" />
              </button>
            )}
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-400 text-center italic">No results found</div>
            ) : (
              filteredOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors flex flex-col ${
                    value === opt.id ? "bg-orange-50 border-l-2 border-[#ff7143]" : ""
                  }`}
                >
                  <span className="font-semibold text-gray-800">{opt.label}</span>
                  {opt.sublabel && (
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                      {opt.sublabel}
                    </span>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

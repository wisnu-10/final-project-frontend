"use client";

import { useState, useRef, useEffect } from "react";
import { FiSearch, FiChevronDown, FiX } from "react-icons/fi";
import { formatIDR } from "@/utils/formatCurrency.utils";

interface SearchableItemSelectProps {
  name: string;
  value: string;
  laundryItems: any[];
  onChange: (e: { target: { name: string; value: string } }) => void;
  placeholder?: string;
}

export default function SearchableItemSelect({
  name,
  value,
  laundryItems,
  onChange,
  placeholder = "Search item...",
}: SearchableItemSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedItem = laundryItems.find((item) => item.id === value);

  const filteredItems = laundryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleSelect = (itemId: string) => {
    onChange({ target: { name, value: itemId } });
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2 border rounded-lg text-sm bg-white outline-none transition-all ${
          isOpen ? "ring-2 ring-[#ff7143]/20 border-[#ff7143]" : "border-gray-200"
        }`}
      >
        <span className={selectedItem ? "text-gray-800 font-medium" : "text-gray-400"}>
          {selectedItem 
            ? `${selectedItem.name} (${selectedItem.pricingType === "kiloan" ? "Kiloan" : formatIDR(Number(selectedItem.price))})` 
            : placeholder}
        </span>
        <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full bottom-full mb-1 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-100">
          <div className="p-2 border-b border-gray-50 flex items-center gap-2 bg-gray-50/50">
            <FiSearch className="text-gray-400 w-4 h-4" />
            <input
              autoFocus
              type="text"
              placeholder="Filter items..."
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
            {filteredItems.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-400 text-center italic">No items found</div>
            ) : (
              filteredItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors flex flex-col ${
                    value === item.id ? "bg-orange-50 border-l-2 border-[#ff7143]" : ""
                  }`}
                >
                  <span className="font-semibold text-gray-800">{item.name}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                    {item.pricingType} • {item.pricingType === "kiloan" ? "Standard Price" : formatIDR(Number(item.price))}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

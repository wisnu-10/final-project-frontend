import { FiUser, FiSearch } from "react-icons/fi";

interface CustomerSelectorProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  customers: any[];
  customersLoading: boolean;
  selectedCustomerId: string;
  setFieldValue: (field: string, value: any) => void;
  error?: string;
  touched?: boolean;
}

export default function CustomerSelector({
  searchTerm,
  setSearchTerm,
  customers,
  customersLoading,
  selectedCustomerId,
  setFieldValue,
  error,
  touched,
}: CustomerSelectorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <FiUser className="w-5 h-5 text-[#ff7143]" />
        Select Customer
      </h2>
      <div className="relative mb-4">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search customer by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#ff7143] focus:border-transparent outline-none transition-all shadow-sm"
        />
      </div>

      <div
        className={`max-h-48 overflow-y-auto space-y-2 border rounded-xl p-2 bg-gray-50/30 transition-all ${
          touched && error
            ? "border-red-500 bg-red-50/20"
            : "border-gray-50"
        }`}
      >
        {customersLoading ? (
          <p className="text-center text-sm text-gray-400 py-4 animate-pulse">Searching...</p>
        ) : customers.length === 0 ? (
          <p className="text-center text-sm text-gray-400 py-4">No customers found.</p>
        ) : (
          customers.map((c: any) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFieldValue("customerId", c.id)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                selectedCustomerId === c.id
                  ? "bg-orange-50 border-[#ff7143] shadow-md scale-[1.01]"
                  : "bg-white border-gray-100 hover:border-[#ff7143]/40"
              }`}
            >
              <div className="font-bold text-sm text-gray-800">
                {c.firstName} {c.lastName}
              </div>
              <div className="text-[11px] text-gray-400">{c.email}</div>
            </button>
          ))
        )}
      </div>
      {touched && error && (
        <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>
      )}
    </div>
  );
}

import { FieldArray } from "formik";
import { FiPackage, FiPlus, FiTrash2 } from "react-icons/fi";
import SearchableItemSelect from "./SearchableItemSelect";

interface LaundryItemsFormProps {
  values: any;
  handleChange: any;
  laundryItems: any[];
}

export default function LaundryItemsForm({
  values,
  handleChange,
  laundryItems,
}: LaundryItemsFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FiPackage className="w-5 h-5 text-[#ff7143]" />
          Additional Items
        </h2>
        <button
          type="button"
          onClick={() => {
            const newItems = [...values.orderItems, { laundryItemId: "", quantity: 1 }];
            handleChange({ target: { name: "orderItems", value: newItems } });
          }}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors text-xs font-bold"
        >
          <FiPlus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      <FieldArray
        name="orderItems"
        render={(arrayHelpers) => (
          <div className="space-y-3">
            {values.orderItems.map((item: any, index: number) => (
              <div key={index} className="flex flex-col gap-1 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <SearchableItemSelect
                    name={`orderItems.${index}.laundryItemId`}
                    value={item.laundryItemId}
                    laundryItems={laundryItems}
                    onChange={handleChange}
                  />
                  <div className="w-20">
                    <input
                      type="number"
                      name={`orderItems.${index}.quantity`}
                      min="1"
                      value={item.quantity}
                      onChange={handleChange}
                      className="w-full px-2 py-2 border border-gray-200 rounded-lg text-sm text-center bg-white outline-none focus:ring-2 focus:ring-[#ff7143]/20 font-bold"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => arrayHelpers.remove(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      />
    </div>
  );
}

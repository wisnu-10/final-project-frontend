'use client';

import useCreatePayment from "@/features/payment-customer/hooks/useCreatePayment";
import { formatIDR } from "@/utils/formatCurrency.utils";
import { CreditCard, Package } from "lucide-react";
import { useState } from "react";

interface PaymentModalProps {
  order: any;
  setShowPayment: (show: boolean) => void;
}

export default function PaymentModal({
  order,
  setShowPayment,
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<
    "credit-card" | "bank-transfer" | "e-wallet"
  >("credit-card");

  const { createPayment, isLoading } = useCreatePayment();

  const handlePayment = () => {
    createPayment(order.id, setShowPayment);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#FF6B4A]/10 flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-[#FF6B4A]" />
          </div>
          <h2 className="text-2xl font-bold text-[#2C2826] mb-2">
            Pembayaran Order
          </h2>
          <p className="text-sm text-[#6B6662]">Order `DL_{order.id.slice(0, 8).toUpperCase()}_{Date.now()}`</p>
        </div>

        {/* Order Summary */}
        <div className="bg-[#FAF6F1] rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#6B6662]">
              Total Weight
            </span>
            <span className="text-sm font-medium text-[#2C2826]">
              {order.totalWeight} kg
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-[#E5DDD3]">
            <span className="font-bold text-[#2C2826]">Total Payment</span>
            <span className="font-bold text-xl text-[#FF6B4A]">
              {formatIDR(order.totalPrice)}
            </span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#6B6662] mb-3">
            Pilih Metode Pembayaran
          </label>
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod("credit-card")}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                paymentMethod === "credit-card"
                  ? "border-[#FF6B4A] bg-[#FFF5F2]"
                  : "border-[#E5DDD3] hover:border-[#FF6B4A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[#FF6B4A]" />
                </div>
                <div>
                  <p className="font-medium text-[#2C2826]">Credit Card</p>
                  <p className="text-xs text-[#6B6662]">
                    Visa, Mastercard, JCB
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod("bank-transfer")}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                paymentMethod === "bank-transfer"
                  ? "border-[#FF6B4A] bg-[#FFF5F2]"
                  : "border-[#E5DDD3] hover:border-[#FF6B4A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#4A90E2]" />
                </div>
                <div>
                  <p className="font-medium text-[#2C2826]">Bank Transfer</p>
                  <p className="text-xs text-[#6B6662]">
                    BCA, Mandiri, BNI, BRI
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod("e-wallet")}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                paymentMethod === "e-wallet"
                  ? "border-[#FF6B4A] bg-[#FFF5F2]"
                  : "border-[#E5DDD3] hover:border-[#FF6B4A]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-[#2C2826]">E-Wallet</p>
                  <p className="text-xs text-[#6B6662]">
                    GoPay, OVO, Dana, ShopeePay
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 mb-6">
          <p className="text-xs text-blue-800">
            ℹ️ Setelah pembayaran berhasil, pesanan Anda akan diproses dan siap
            untuk diantar.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              setShowPayment(false);
            }}
            className="flex-1 px-6 py-3 rounded-xl border-2 border-[#E5DDD3] text-[#6B6662] hover:border-[#FF6B4A] transition-all disabled:opacity-50"
          >
            Batal
          </button>
          <button 
          onClick={handlePayment}
          className="flex-1 px-6 py-3 rounded-xl bg-[#FF6B4A] text-white hover:bg-[#FF5533] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? "Memproses..." : "Bayar Sekarang"}
          </button>
        </div>
      </div>
    </div>
  );
}

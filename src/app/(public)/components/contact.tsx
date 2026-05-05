import { Mail, Phone } from "lucide-react";

export default function Contact () {
    return (
      <section
        id="contact"
        className="py-12 md:py-20 px-4 md:px-8 bg-linear-to-b from-white to-[#FFF5F2]"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2826] mb-4 leading-tight">
              Got Questions? We've Got Answers
            </h2>
            <p className="text-[#6B6662] text-sm md:text-base">
              Get in touch with us and we'll respond as soon as possible
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-12">
            {/* Contact Info Cards */}
            <div className="bg-[#FAF6F1] rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow border border-[#E5DDD3] text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B4A] flex items-center justify-center mb-6 mx-auto sm:mx-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2C2826] mb-2">Phone</h3>
              <p className="text-sm text-[#6B6662] mb-3">Call us anytime</p>
              <a
                href="tel:+15551234567"
                className="text-[#FF6B4A] font-bold hover:underline text-lg"
              >
                +1 (555) 123-4567
              </a>
            </div>

            <div className="bg-[#FAF6F1] rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow border border-[#E5DDD3] text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B4A] flex items-center justify-center mb-6 mx-auto sm:mx-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2C2826] mb-2">Email</h3>
              <p className="text-sm text-[#6B6662] mb-3">Send us a message</p>
              <a
                href="mailto:dilaundryin@gmail.com"
                className="text-[#FF6B4A] font-bold hover:underline text-lg break-all"
              >
                dilaundryin@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    );
}
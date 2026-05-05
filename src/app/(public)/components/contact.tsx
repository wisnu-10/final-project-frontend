import { Mail, Phone } from "lucide-react";

export default function Contact () {
    return (
      <section
        id="contact"
        className="py-20 px-8 bg-gradient-to-b from-white to-[#FFF5F2]"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2C2826] mb-4">
              Got Questions? We've Got Answers
            </h2>
            <p className="text-[#6B6662]">
              Get in touch with us and we'll respond as soon as possible
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Info Cards */}
            <div className="bg-[#FAF6F1] rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B4A] flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2C2826] mb-2">Phone</h3>
              <p className="text-[#6B6662] mb-2">Call us anytime</p>
              <a
                href="tel:+15551234567"
                className="text-[#FF6B4A] font-semibold hover:underline"
              >
                +1 (555) 123-4567
              </a>
            </div>

            <div className="bg-[#FAF6F1] rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B4A] flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2C2826] mb-2">Email</h3>
              <p className="text-[#6B6662] mb-2">Send us a message</p>
              <a
                href="mailto:hello@diLaundryin.com"
                className="text-[#FF6B4A] font-semibold hover:underline"
              >
                dilaundryin@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    );
}
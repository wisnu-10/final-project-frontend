import { Users } from "lucide-react";

export default function AboutUs() {
  const aboutImage1 =
    "https://images.unsplash.com/photo-1765015981416-22180f61400a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXVuZHJ5JTIwZm9sZGVkJTIwY2xvdGhlcyUyMHN0YWNrfGVufDF8fHx8MTc3MzE1NTUyNnww&ixlib=rb-4.1.0&q=80&w=1080";
  const aboutImage2 =
    "https://images.unsplash.com/photo-1581840862636-a325879bd052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkcnklMjBjbGVhbmluZyUyMHNlcnZpY2V8ZW58MXx8fHwxNzczMTU1NTI3fDA&ixlib=rb-4.1.0&q=80&w=1080";
  const aboutImage3 =
    "https://images.unsplash.com/photo-1760788780087-a723989f93dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXVuZHJvbWF0JTIwd2FzaGluZyUyMG1hY2hpbmVzJTIwbW9kZXJufGVufDF8fHx8MTc3MzEyNDI2OXww&ixlib=rb-4.1.0&q=80&w=1080";

  return (
    <section
      id="about"
      className="py-12 md:py-20 px-4 md:px-8 bg-linear-to-b from-white to-[#FFF5F2]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2826] mb-6 leading-tight">
              About us beyond your expectations
            </h2>
            <p className="text-[#6B6662] leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              diLaundryin provides exceptional laundry services with a
              commitment to quality and customer satisfaction. Our experienced
              team uses premium products and modern equipment to ensure your
              clothes receive the best care possible.
            </p>

            {/* Stat Card */}
            <div className="bg-white border border-[#E5DDD3] rounded-2xl p-6 inline-flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#2C2826] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-2xl md:text-3xl font-bold text-[#2C2826]">800+</p>
                <p className="text-sm text-[#6B6662]">
                  Happy clients and counting
                </p>
              </div>
            </div>
          </div>

          {/* Right - Image Grid */}
          <div className="grid grid-cols-2 gap-4 mt-8 lg:mt-0">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img
                src={aboutImage1}
                alt="Folded laundry"
                className="w-full h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img
                src={aboutImage2}
                alt="Dry cleaning"
                className="w-full h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="col-span-2 rounded-2xl overflow-hidden shadow-md">
              <img
                src={aboutImage3}
                alt="Washing machines"
                className="w-full h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Process () {
    return (
      <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2826] mb-4 leading-tight">
              Our easy process for fresh laundry every time
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              {
                num: "01",
                title: "Schedule Pickup",
                desc: "Choose your pickup time",
              },
              {
                num: "02",
                title: "We Collect",
                desc: "We pick up your laundry",
              },
              {
                num: "03",
                title: "Expert Cleaning",
                desc: "Professional wash & care",
              },
              {
                num: "04",
                title: "Fresh Delivery",
                desc: "Delivered clean to you",
              },
            ].map((step) => (
              <div key={step.num} className="group text-center">
                <div className="w-16 h-16 rounded-full bg-[#FF6B4A] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform">
                  {step.num}
                </div>
                <h4 className="font-bold text-lg text-[#2C2826] mb-2">{step.title}</h4>
                <p className="text-sm text-[#6B6662] max-w-[150px] mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}
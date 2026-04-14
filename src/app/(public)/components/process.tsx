export default function Process () {
    return (
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2C2826] mb-4">
              Our easy process for fresh
              <br />
              laundry every time
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
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
              <div key={step.num} className="text-center">
                <div className="w-16 h-16 rounded-full bg-[#FF6B4A] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h4 className="font-bold text-[#2C2826] mb-2">{step.title}</h4>
                <p className="text-sm text-[#6B6662]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}
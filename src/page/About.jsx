import { FaHeartbeat, FaUsers, FaLightbulb, FaShieldAlt, FaTrophy, FaHandsHelping } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate=useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            About Back2u Portal
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            A trusted digital platform to reunite people with their belongings.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex justify-center">
        <div className="max-w-6xl w-full px-6 lg:px-8 py-24 space-y-24">

          {/* Mission Section */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-extrabold text-black mb-8">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-prose">
                  The Lost and Found Portal is a comprehensive digital platform designed to help students, staff members, and university community members recover their lost belongings efficiently and securely.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-prose">
                  Our mission is to <span className="font-semibold text-blue-600">reunite people with their belongings</span> quickly and efficiently. We believe that beyond the material value, small things matter deeply to individuals.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed max-w-prose">
                  We aim to inspire a culture of helpfulness where community members actively assist in returning lost items, creating a safer and more connected campus environment.
                </p>
              </div>

              {/* Feature Card Box */}
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-transform transform hover:scale-105">
                <div className="space-y-8">
                  {[
                    { icon: <FaHeartbeat />, color: "bg-blue-600", title: "Community Driven", desc: "Built on trust and collective responsibility" },
                    { icon: <FaUsers />, color: "bg-green-600", title: "Easy Access", desc: "Simple and intuitive interface for everyone" },
                    { icon: <FaShieldAlt />, color: "bg-purple-600", title: "Secure & Private", desc: "Protecting your personal information always" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`flex items-center justify-center h-12 w-12 rounded-xl ${item.color} text-white`}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-black">{item.title}</h3>
                        <p className="text-gray-600 mt-2">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Section */}
          <section>
            <h2 className="text-4xl font-extrabold bg-black text-white mb-16 text-center py-4 rounded-lg shadow-md">
              Why Choose Back2u?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { icon: <FaLightbulb className="text-3xl text-blue-600" />, bg: "bg-blue-100", title: "Smart Matching", desc: "Our intelligent system helps match lost items with found items." },
                { icon: <FaTrophy className="text-3xl text-green-600" />, bg: "bg-green-100", title: "Proven Track Record", desc: "Successfully helping hundreds recover belongings campus-wide." },
                { icon: <FaHandsHelping className="text-3xl text-purple-600" />, bg: "bg-purple-100", title: "24/7 Support", desc: "Round-the-clock support anytime you need assistance." },
              ].map((card, i) => (
                <div key={i} className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 hover:scale-105">
                  <div className={`flex items-center justify-center h-16 w-16 rounded-full ${card.bg} mb-6 mx-auto`}>
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-4 text-center">{card.title}</h3>
                  <p className="text-gray-700 text-center leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Core Values */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-16 border border-blue-100 shadow-md">
            <h2 className="text-4xl font-extrabold text-black mb-16 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {["Integrity", "Compassion", "Community Trust", "Efficiency"].map((value, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white font-bold shadow-md">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">{value}</h3>
                    <p className="text-gray-700">We maintain high standards and prioritize people-first values.</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-16 text-white shadow-lg">
            <h2 className="text-4xl font-extrabold mb-6">
              Ready to Report or Search for Items?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join our community and help bring lost belongings back to their owners.
            </p>
            <button onClick={()=>navigate("/report")} className="px-8 py-4 bg-white text-blue-700 font-bold rounded-full shadow-md hover:bg-blue-100 transition">
              Get Started
            </button>
          </section>

        </div>
      </div>
    </div>
  );
};

export default About;
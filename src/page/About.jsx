import { FaHeartbeat, FaUsers, FaLightbulb, FaShieldAlt, FaTrophy, FaHandsHelping } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            About Back2u Portal
          </h1>
          
        </div>
      </section> 

      {/* Main Content */}
      <div className="flex justify-center">
        <div className="max-w-6xl w-full px-6 lg:px-8 py-24 space-y-24">

          {/* Mission Section */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-extrabold  text-black mb-8">
                  Our Mission
                </h2>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  The Lost and Found Portal is a comprehensive digital platform designed to help students, staff members, and university community members recover their lost belongings efficiently and securely.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Our mission is to <span className="font-semibold text-blue-600">reunite people with their belongings</span> quickly and efficiently. We believe that beyond the material value, small things matter deeply to individuals.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  We aim to inspire a culture of helpfulness where community members actively assist in returning lost items, creating a safer and more connected campus environment.
                </p>
              </div>

              {/* Feature Card Box */}
              <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
                <div className="space-y-8">

                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-600 text-white">
                      <FaHeartbeat />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black">Community Driven</h3>
                      <p className="text-gray-600 mt-2">Built on trust and collective responsibility</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-green-600 text-white">
                      <FaUsers />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black">Easy Access</h3>
                      <p className="text-gray-600 mt-2">Simple and intuitive interface for everyone</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-purple-600 text-white">
                      <FaShieldAlt />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black">Secure & Private</h3>
                      <p className="text-gray-600 mt-2">Protecting your personal information always</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>


          {/* Why Choose Section */}
          <section>
            <h2 className="text-4xl font-extrabold bg-black text-white mb-16 text-center">
              Why Choose Back2u?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

              <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6 mx-auto">
                  <FaLightbulb className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4 text-center">Smart Matching</h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  Our intelligent system helps match lost items with found items.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6 mx-auto">
                  <FaTrophy className="text-3xl text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4 text-center">Proven Track Record</h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  Successfully helping hundreds recover belongings campus-wide.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-6 mx-auto">
                  <FaHandsHelping className="text-3xl text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4 text-center">24/7 Support</h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  Round-the-clock support anytime you need assistance.
                </p>
              </div>

            </div>
          </section>


          {/* Core Values */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-16 border border-blue-100">
            <h2 className="text-4xl font-extrabold text-black mb-16 text-center">
              Our Core Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {["Integrity", "Compassion", "Community Trust", "Efficiency"].map((value, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 text-white font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-2">{value}</h3>
                    <p className="text-gray-700">
                      We maintain high standards and prioritize people-first values.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>


          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-16 text-white">
            <h2 className="text-4xl font-extrabold mb-6">
              Ready to Report or Search for Items?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join our community and help bring lost belongings back to their owners.
            </p>

            
          </section>

        </div>
      </div>
    </div>
  );
};

export default About;

import React from "react";

const Contact = () => {
  const teamMembers = [
    { name: "Ananya Gupta", gender: "Female", phone: "9876543210", email: "ananya@example.com", department: "Computer Science", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya" },
    { name: "Priya Sharma", gender: "Female", phone: "9876543211", email: "priya@example.com", department: "Electronics", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
    { name: "Rahul Verma", gender: "Male", phone: "9876543212", email: "rahul@example.com", department: "Mechanical", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
    { name: "Amit Singh", gender: "Male", phone: "9876543213", email: "amit@example.com", department: "Civil", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit" },
    { name: "Karan Mehta", gender: "Male", phone: "9876543214", email: "karan@example.com", department: "IT", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karan" },
    { name: "Rohit Kumar", gender: "Male", phone: "9876543215", email: "rohit@example.com", department: "Electrical", photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf6ec] via-[#f8efe4] to-[#fdf6ec] px-4 py-16">

      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
          Contact Us
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Meet our dedicated Proctorial Board members
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <img
                src={member.photo}
                alt={member.name}
                className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Name */}
            <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
              {member.name}
            </h3>

            {/* Info */}
            <div className="space-y-3 text-sm">

              <div className="flex justify-between text-gray-500">
                <span>📞 Phone</span>
                <span className="text-gray-800">{member.phone}</span>
              </div>

              <div className="flex justify-between text-gray-500">
                <span>✉️ Email</span>
                <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                  {member.email}
                </a>
              </div>

              <div className="flex justify-between text-gray-500">
                <span>🏫 Dept</span>
                <span className="text-gray-800">{member.department}</span>
              </div>

              <div className="flex justify-between text-gray-500 border-t pt-3">
                <span>👤 Gender</span>
                <span className="text-gray-800">{member.gender}</span>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Procedure Section */}
      <div className="mt-20 max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-lg">

        <h3 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          📜 Lost & Found Procedure
        </h3>

        <p className="text-center text-gray-600 text-lg max-w-3xl mx-auto mb-10">
          If you find any item in the campus, submit it to the Chief or the Chief’s office.
          The item will be returned to the rightful owner. You will also be rewarded.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-indigo-50 rounded-xl p-6">
            <div className="text-4xl mb-2">🔍</div>
            <p className="text-gray-700 font-medium">Find Item</p>
          </div>

          <div className="bg-indigo-50 rounded-xl p-6">
            <div className="text-4xl mb-2">🏢</div>
            <p className="text-gray-700 font-medium">Submit to Office</p>
          </div>

          <div className="bg-indigo-50 rounded-xl p-6">
            <div className="text-4xl mb-2">🎁</div>
            <p className="text-gray-700 font-medium">Get Reward</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;
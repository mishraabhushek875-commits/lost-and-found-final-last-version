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
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-white flex items-center justify-center px-4 sm:px-6 py-12 sm:py-20">
      <div className="w-full max-w-6xl animate-fade-in">

        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-2 sm:mb-4">
            Contact Us
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-400 to-indigo-600 mx-auto rounded-full mb-4 sm:mb-6"></div>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Meet our dedicated team members from the Proctorial Board
          </p>
        </div>

        {/* Subheading */}
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400 mb-2">
            Community Team
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">(Proctorial Board Members)</p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-600 hover:border-blue-500/50"
            >
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 rounded-xl sm:rounded-2xl transition-all duration-300"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Name */}
                <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 line-clamp-2">
                  {member.name}
                </h4>

                {/* Info Section */}
                <div className="space-y-2 sm:space-y-3">
                  {/* Phone */}
                  <div className="flex items-center gap-3 group/item">
                    <div className="flex-shrink-0">
                      <span className="text-lg sm:text-xl">📞</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-semibold">Phone</p>
                      <p className="text-sm sm:text-base text-white font-medium break-all group-hover/item:text-blue-300 transition-colors">
                        {member.phone}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3 group/item">
                    <div className="flex-shrink-0">
                      <span className="text-lg sm:text-xl">✉️</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-semibold">Email</p>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-sm sm:text-base text-blue-400 hover:text-blue-300 font-medium break-all transition-colors"
                      >
                        {member.email}
                      </a>
                    </div>
                  </div>

                  {/* Department */}
                  <div className="flex items-center gap-3 group/item">
                    <div className="flex-shrink-0">
                      <span className="text-lg sm:text-xl">🏫</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-semibold">Department</p>
                      <p className="text-sm sm:text-base text-slate-300 font-medium break-words group-hover/item:text-white transition-colors">
                        {member.department}
                      </p>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="flex items-center gap-3 pt-2 sm:pt-3 border-t border-slate-600 group/item">
                    <div className="flex-shrink-0">
                      <span className="text-lg sm:text-xl">👤</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider font-semibold">Gender</p>
                      <p className="text-sm sm:text-base text-slate-300 font-medium group-hover/item:text-white transition-colors">
                        {member.gender}
                      </p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 sm:mt-16 text-center">
  <p className="text-slate-500 text-xs sm:text-sm">
    For any queries or issues, feel free to contact any of our team members above
  </p>
</div>


{/* Procedure Section */}
<div className="mt-16 bg-gradient-to-r from-indigo-50 via-white to-indigo-100 p-8 rounded-2xl shadow-lg">
  {/* Heading */}
  <h3 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center flex items-center justify-center gap-2">
    📜 Procedure You Have to Follow If You Found Something
  </h3>

  {/* Illustration Row */}
  <div className="flex justify-center mb-6">
    <img
      src="https://via.placeholder.com/150"
      alt="Submit item illustration"
      className="w-32 h-32 rounded-full shadow-md border-2 border-indigo-300"
    />
  </div>

  {/* Paragraph */}
  <p className="text-gray-700 text-lg leading-relaxed text-center max-w-2xl mx-auto">
    If you find any item or belonging within the campus, you must immediately
    take it to the <span className="font-semibold text-indigo-600">Chief</span> 
    or submit it at the <span className="font-semibold text-indigo-600">Chief’s office</span>. 
    Once the rightful owner claims the item, it will be returned to them. 
    As a token of appreciation, you will also be <span className="font-semibold text-green-600">rewarded</span> 
    for your honesty and responsible action.
  </p>

  {/* Icons Row */}
  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
    <div className="flex flex-col items-center">
      <span className="text-4xl">🔍</span>
      <p className="mt-2 text-sm text-gray-600">Find the Item</p>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-4xl">🏢</span>
      <p className="mt-2 text-sm text-gray-600">Submit to Chief’s Office</p>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-4xl">🎁</span>
      <p className="mt-2 text-sm text-gray-600">Receive Your Reward</p>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default Contact;
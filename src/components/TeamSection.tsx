
export function TeamSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our experienced professionals are dedicated to providing you with the highest quality dental care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover-scale"
            >
              <div className="h-64 bg-blue-100 flex items-center justify-center">
                <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 text-3xl font-semibold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-gray-900">{member.name}</h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const team = [
  {
    name: "Dr. Jennifer Reynolds",
    role: "Lead Dentist",
    bio: "Dr. Reynolds has over 15 years of experience in general and cosmetic dentistry. She specializes in creating beautiful, functional smiles using the latest techniques."
  },
  {
    name: "Dr. Marcus Chen",
    role: "Orthodontist",
    bio: "Dr. Chen is an expert in orthodontic treatments for patients of all ages. He's known for his gentle approach and excellent results with both traditional braces and clear aligners."
  },
  {
    name: "Dr. Sophia Patel",
    role: "Pediatric Dentist",
    bio: "Dr. Patel loves working with children and has a special talent for making dental visits fun and stress-free for our youngest patients."
  },
  {
    name: "Emma Wilson",
    role: "Dental Hygienist",
    bio: "Emma is passionate about preventive care and patient education. She ensures each cleaning is thorough while keeping patients comfortable."
  },
  {
    name: "Sarah Johnson",
    role: "Office Manager",
    bio: "Sarah keeps our practice running smoothly and is dedicated to helping patients with scheduling, insurance questions, and financial arrangements."
  },
  {
    name: "Michael Rodriguez",
    role: "Dental Assistant",
    bio: "Michael assists our dentists with procedures and helps ensure patients understand their treatment plans. He's known for his calming presence."
  },
  {
    name: "Dr. James Thompson",
    role: "Oral Surgeon",
    bio: "Dr. Thompson specializes in complex extractions, implant placement, and other oral surgeries. He combines surgical skill with compassionate care."
  },
  {
    name: "Lisa Chang",
    role: "Patient Coordinator",
    bio: "Lisa is often the first face you'll see at our office. She's dedicated to making sure every patient feels welcome and all questions are answered."
  }
];

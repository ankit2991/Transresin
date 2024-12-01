import React from "react";

const CareerScreen = () => {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      location: "Remote",
      type: "Full-time",
    },
    {
      id: 2,
      title: "Backend Developer",
      location: "San Francisco, CA",
      type: "Part-time",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "New York, NY",
      type: "Full-time",
    },
  ];

  return (
    <div className="bg-blue-50">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg">
            Be part of a team that’s building innovative solutions for tomorrow.
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Open Positions
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-6 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {job.title}
                </h3>
                <p className="text-gray-600">{job.location}</p>
                <p className="text-sm text-gray-500 mb-4">{job.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Apply for a Job
          </h2>
          <form className="space-y-6 bg-white p-6 shadow-md rounded-lg">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Resume (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                rows="4"
                placeholder="Tell us why you're a great fit"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary-300 text-white font-medium rounded-lg hover:bg-primary-600"
            >
              Submit Application
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CareerScreen;

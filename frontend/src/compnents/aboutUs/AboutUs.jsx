import React from "react";
import Navbar from "../navbar/Navbar";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const teamMembers = [
  {
    name: "Manish Punde",
    image: "media/images/Manish.jpg",
    branch: "Information Technology",
    college: "BRACT's, Vishwakarma Institute of Information Technology",
    insta: "https://www.instagram.com/manish__2810/",
    linkedin: "https://www.linkedin.com/in/manish-punde-825879294/",
    github: "https://github.com/ManishP2810",
  },
  {
    name: "Vishal Gaikwad",
    image: "media/images/Vishal.jpg",
    branch: "Information Technology",
    college: "BRACT's, Vishwakarma Institute of Information Technology",
    insta: "#",
    linkedin: "http://www.linkedin.com/in/vishal-gaikwad-9ba99228a",
    github: "https://github.com/Vishals3151",
  },
  {
    name: "Prateek Khese",
    image: "media/images/Prateek.jpg",
    branch: "Information Technology",
    college: "BRACT's, Vishwakarma Institute of Information Technology",
    insta: "https://www.instagram.com/prateekhese?igsh=b2h6YXZoam5nMjM2",
    linkedin: "https://www.linkedin.com/in/prateek-khese-223207279",
    github: "https://github.com/Prateek212005/",
  },
  {
    name: "Stimit Keluskar",
    image: "media/images/Stimit.jpg",
    branch: "Information Technology",
    college: "BRACT's, Vishwakarma Institute of Information Technology",
    insta: "https://www.instagram.com/stimitk/",
    linkedin: "https://www.linkedin.com/in/stimitk/",
    github: "https://github.com/stimit1404k",
  },
];

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <section className="mt-[5rem] min-h-screen text-xl bg-gray-50">
        <div className="py-10 px-6 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-12">
            <h2 className="mb-4 text-4xl md:text-5xl font-extrabold text-gray-900">
              Meet Our Team
            </h2>
            <p className="text-gray-600 text-lg">
              Passionate developers from VIIT building impactful solutions 🚀
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="flex items-center rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50"
              >
                <img
                  className="w-44 h-44 object-cover rounded-l-xl"
                  src={member.image}
                  alt={member.name}
                />
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <span className="text-gray-600">{member.college}</span>
                  <p className="mt-2 mb-4 text-gray-500 font-medium">
                    {member.branch}
                  </p>
                  <ul className="flex space-x-5">
                    <li>
                      <a
                        href={member.insta}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-pink-600 transition-colors"
                      >
                        <FaInstagram size={28} />
                      </a>
                    </li>
                    <li>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <FaLinkedin size={28} />
                      </a>
                    </li>
                    <li>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-black transition-colors"
                      >
                        <FaGithub size={28} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;

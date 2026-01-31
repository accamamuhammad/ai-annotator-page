import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Download,
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  ChevronDown,
} from "lucide-react";

import emailjs from "emailjs-com";

import Photo from "../public/passport-photo.jpeg";

const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

const sendEmail = (e) => {
  e.preventDefault();

  emailjs
    .sendForm(
      "service_z0u8mzq", // Your Service ID
      "template_qwy1xgk", // Your Template ID
      e.target,
      "ShCzbOYFHSPAgpspT", // Your Public Key
    )
    .then(
      () => {
        alert("Message sent successfully!"); // optional: replace with a nicer UI later
        e.target.reset();
      },
      (error) => {
        alert("Failed to send message, please try again.");
        console.error(error);
      },
    );
};
const tools = [
  "Label Studio",
  "Subtitle Edit",
  "Google Sheets",
  "Excel",
  "Basic QA workflows",
];

  const projects = [
    {
      title: "Hausa → English Subtitle Translation",
      description:
        "Transcribed and translated Hausa interview videos into English subtitles, ensuring accurate timing, readability, and cultural context.",
      details: [
        "Total duration: ~40 minutes",
        "Files produced: .srt subtitle files",
        "Focus: dialect accuracy, subtitle timing, readability",
      ],
      tools: ["Subtitle Edit", "VLC", "Google Sheets"],
      proofLink:
        "https://docs.google.com/spreadsheets/d/1zPXkMxMXt0d_FB0dKVRXNxbR-6Aw7bZam8UjEJ4LuYU/edit?usp=sharing",
      proofType: "Google Sheets",
    },
    {
      title: "Text Classification & Annotation",
      description:
        "Annotated English text samples for intent classification using Label Studio, following consistent labeling guidelines.",
      details: [
        "~200 text samples",
        "Manual QA and label consistency checks",
        "Progress tracked in Google Sheets",
      ],
      tools: ["Label Studio", "Google Sheets"],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-blue-600">MA</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {["home", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize px-4 py-2 rounded-lg font-medium transition ${
                    activeSection === section
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-3 space-y-2 bg-white border-t border-gray-200">
              {["home", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                    activeSection === section
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Home */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-16 px-4 bg-white"
      >
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible.home
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* Avatar */}
          <div className="mb-8 mt-10 flex justify-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-600 shadow-xl">
              <img
                src={Photo}
                alt="Muhammad Accama"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-4">
            Muhammad Hussaini Accama
          </h1>

          <div className="bg-blue-600 text-white rounded-2xl p-6 mb-6 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-semibold">
              AI Data Annotator & Language Specialist
            </h2>
            <p className="text-lg opacity-90 mt-1">Hausa ↔ English</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
            <p className="text-gray-600 text-lg leading-relaxed">
              Detail-oriented data annotator specializing in speech data, AI
              annotation, and multilingual subtitle translation. Native Hausa
              speaker with experience in QA and text classification.
            </p>
          </div>

          {/* Tools */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Tools & Skills</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-5 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-100 hover:bg-blue-100 transition"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Scroll */}
          <div className="mt-16">
            <button
              onClick={() => scrollToSection("projects")}
              className="p-3 rounded-full bg-blue-50 mb-5 text-blue-600 hover:bg-blue-100 transition"
            >
              <ChevronDown size={32} />
            </button>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="min-h-screen py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-blue-600">
            Featured Projects
          </h2>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-600 transition-all ${
                  isVisible.projects
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6">{project.description}</p>

                <ul className="space-y-2 mb-6">
                  {project.details.map((detail, i) => (
                    <li key={i} className="text-gray-600">
                      • {detail}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 text-sm rounded-full bg-blue-50 text-blue-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {project.proofLink && (
                  <a
                    href={project.proofLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <ExternalLink size={18} />
                    View {project.proofType}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center py-20 px-4 bg-white"
      >
        <div className="max-w-6xl mx-auto w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            Let's Work Together
          </h2>
          <p className="text-gray-600 mb-12 text-lg">
            Have a project in mind? Reach out anytime.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white border text-left border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <Mail className="text-blue-600" size={32} />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">accamamuhammad17@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border text-left border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <Phone className="text-blue-600" size={32} />
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-gray-600">+234 903 377 3440</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border text-left border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-4">
                  <Linkedin className="text-blue-600" size={32} />
                  <div>
                    <p className="font-semibold">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/in/muhammad-accama-172b03266"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View profile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CV + Question Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
              {/* CV */}
              <div className="text-center">
                <Download size={40} className="text-blue-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold mb-2">Curriculum Vitae</h3>
                <p className="text-gray-600 mb-4">
                  A brief overview of my experience, tools, and recent work.
                </p>

                <a
                  href="/AI-Annotation-Cv.pdf"
                  download="Muhammad_Accama_CV.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  <Download size={18} />
                  View CV
                </a>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200" />

              {/* Question Form */}
              <div>
                <h4 className="text-xl font-semibold mb-2">Have a question?</h4>
                <p className="text-gray-600 mb-4">
                  Leave a message and I’ll get back to you by email.
                </p>

                <form onSubmit={sendEmail} className="space-y-4">
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your name"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your email"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Your message"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Send message
                  </button>
                </form>
              </div>
            </div>
          </div>

          <p className="mt-12 text-gray-500">© 2026 Muhammad Hussaini Accama</p>
        </div>
      </section>
    </div>
  );
};

export default App;

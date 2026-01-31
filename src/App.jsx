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
              <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg">
                <Mail size={28} />
                <p className="mt-2">accamamuhammad17@gmail.com</p>
              </div>

              <div className="bg-blue-50 text-blue-700 rounded-2xl p-6 shadow-sm">
                <Phone size={28} />
                <p className="mt-2">+234 903 377 3440</p>
              </div>

              <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-lg">
                <Linkedin size={28} />
                <a
                  href="https://www.linkedin.com/in/muhammad-accama-172b03266"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 underline"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>

            {/* CV */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center">
              <Download size={48} className="text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Download My CV</h3>
              <a
                href="/mnt/user-data/uploads/AI-Annotation-CV_.pdf"
                download
                className="mt-4 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Download CV
              </a>
            </div>
          </div>

          <p className="mt-12 text-gray-500">© 2026 Muhammad Hussaini Accama</p>
        </div>
      </section>
    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import Button from "../components/Button";
import { useTheme } from "next-themes";
// Data
import { name, showResume } from "../data/portfolio.json";
import { resume } from "../data/portfolio.json";
import data from "../data/portfolio.json";

const Resume = () => {
  const router = useRouter();
  const theme = useTheme();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
    if (!showResume) {
      router.push("/");
    }
  }, []);
  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6 no-print">
          <Button onClick={() => router.push("/edit")} type={"primary"}>
            Edit Resume
          </Button>
        </div>
      )}
      <div className="fixed top-6 right-6 no-print">
        <Button 
          onClick={() => window.print()} 
          type={"primary"}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Print Resume
        </Button>
      </div>
      {data.showCursor && <Cursor />}
      <div
        className={`container mx-auto mb-10 ${
          data.showCursor && "cursor-none"
        }`}
      >
        <Header isBlog />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div
              className={`resume-container w-full relative overflow-hidden fade-in-up ${
                mount && theme.theme === "dark" 
                  ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700" 
                  : "bg-gradient-to-br from-white via-gray-50 to-white border border-gray-200"
              } max-w-4xl p-12 mob:p-6 desktop:p-16 rounded-2xl shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-3xl`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {name}
                  </h1>
                </div>
                
                <h2 className="text-2xl mt-4 font-semibold text-gray-700 dark:text-gray-200">
                  {resume.tagline}
                </h2>
                
                <p className="w-full text-lg mt-4 leading-relaxed text-gray-600 dark:text-gray-300 italic">
                  {resume.description}
                </p>
                
                <div className="mt-8">
                  <Socials />
                </div>
                <div className="mt-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Experience</h1>
                  </div>

                  <div className="space-y-6">
                    {resume.experiences.map(
                      ({ id, dates, type, position, bullets }) => (
                        <div
                          key={id}
                          className={`resume-card p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover-lift ${
                            theme.theme === "dark"
                              ? "bg-slate-800/50 border-slate-600 hover:bg-slate-800/70"
                              : "bg-gray-50/50 border-gray-200 hover:bg-gray-100/70"
                          }`}
                        >
                          <ProjectResume
                            dates={dates}
                            type={type}
                            position={position}
                            bullets={bullets}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="mt-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Education</h1>
                  </div>
                  
                  <div className={`resume-card p-6 rounded-xl border ${
                    theme.theme === "dark"
                      ? "bg-slate-800/50 border-slate-600"
                      : "bg-gray-50/50 border-gray-200"
                  }`}>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                      {resume.education.universityName}
                    </h2>
                    <h3 className="text-base text-gray-600 dark:text-gray-400 mt-2">
                      {resume.education.universityDate}
                    </h3>
                    <p className="text-base mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
                      {resume.education.universityPara}
                    </p>
                  </div>
                </div>
                <div className="mt-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Skills</h1>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {resume.languages && (
                      <div className={`resume-card p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover-lift ${
                        theme.theme === "dark"
                          ? "bg-slate-800/50 border-slate-600 hover:bg-slate-800/70"
                          : "bg-gray-50/50 border-gray-200 hover:bg-gray-100/70"
                      }`}>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Languages</h2>
                        </div>
                        <ul className="space-y-2">
                          {resume.languages.map((language, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                              <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></span>
                              {language}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {resume.frameworks && (
                      <div className={`resume-card p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover-lift ${
                        theme.theme === "dark"
                          ? "bg-slate-800/50 border-slate-600 hover:bg-slate-800/70"
                          : "bg-gray-50/50 border-gray-200 hover:bg-gray-100/70"
                      }`}>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Frameworks</h2>
                        </div>
                        <ul className="space-y-2">
                          {resume.frameworks.map((framework, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                              <span className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></span>
                              {framework}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {resume.others && (
                      <div className={`resume-card p-6 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover-lift ${
                        theme.theme === "dark"
                          ? "bg-slate-800/50 border-slate-600 hover:bg-slate-800/70"
                          : "bg-gray-50/50 border-gray-200 hover:bg-gray-100/70"
                      }`}>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Others</h2>
                        </div>
                        <ul className="space-y-2">
                          {resume.others.map((other, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                              <span className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></span>
                              {other}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Resume;

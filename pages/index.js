import { useRef } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";

// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <div className={`relative min-h-screen ${data.showCursor && "cursor-none"}`}>
      {data.showCursor && <Cursor />}
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10 px-4 laptop:px-0">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h1
                ref={textOne}
                className="text-4xl tablet:text-7xl laptop:text-7xl laptopl:text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight"
              >
                {data.headerTaglineOne}
              </h1>
            </div>
            <h1
              ref={textTwo}
              className="text-4xl tablet:text-7xl laptop:text-7xl laptopl:text-9xl font-bold text-gray-800 dark:text-gray-100 leading-tight mt-4"
            >
              {data.headerTaglineTwo}
            </h1>
            <h1
              ref={textThree}
              className="text-4xl tablet:text-7xl laptop:text-7xl laptopl:text-9xl font-bold text-gray-700 dark:text-gray-200 leading-tight mt-4"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="text-3xl tablet:text-5xl laptop:text-5xl laptopl:text-7xl font-semibold text-gray-600 dark:text-gray-300 leading-tight mt-4 italic"
            >
              {data.headerTaglineFour}
            </h1>
          </div>

          <div className="mt-8 laptop:mt-12">
            <Socials />
          </div>
        </div>
        <div className="mt-16 laptop:mt-24 p-2 laptop:p-0" ref={workRef}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h1 className="text-3xl laptop:text-4xl font-bold text-gray-900 dark:text-gray-100">Projects and Work Samples</h1>
          </div>

          <div className="mt-8 laptop:mt-12 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-8 laptop:gap-10">
            {data.projects.map((project) => (
              <WorkCard
                key={project.id}
                img={project.imageSrc}
                name={project.title}
                description={project.description}
                onClick={() => window.open(project.url)}
              />
            ))}
          </div>
        </div>

      
        {/* This button should not go into production */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-5 right-5">
            <Link href="/edit">
              <Button type="primary">Edit Data</Button>
            </Link>
          </div>
        )}
        <div className="mt-16 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h1 className="text-3xl laptop:text-4xl font-bold text-gray-900 dark:text-gray-100">About Me</h1>
          </div>
          
          <div className={`max-w-4xl p-8 rounded-2xl ${
            typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
              ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700"
              : "bg-gradient-to-br from-white via-gray-50 to-white border border-gray-200"
          } shadow-xl backdrop-blur-sm transition-all duration-300`}>
            <p className="text-lg laptop:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
              {data.aboutpara}
            </p>
            
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                Full Stack Development
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                Machine Learning
              </span>
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                Research & Development
              </span>
              <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full text-sm font-medium">
                Team Leadership
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

import React from "react";

const ProjectResume = ({ dates, type, position, bullets }) => {
  return (
    <div className="flex flex-col mob:flex-row gap-4">
      <div className="mob:w-full desktop:w-2/5">
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
          {dates}
        </h2>
        <h3 className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {type}
        </h3>
      </div>
      <div className="mob:w-full desktop:w-3/5">
        <h2 className="text-base font-bold text-gray-900 dark:text-gray-50">
          {position}
        </h2>
        {bullets && bullets.length > 0 && (
          <ul className="mt-3 space-y-2">
            {bullets.map((bullet, index) => (
              <li key={index} className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectResume;

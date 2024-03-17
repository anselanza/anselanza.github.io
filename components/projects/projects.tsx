import React from "react";
import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { BsArrowRight } from "react-icons/bs";
import { useTheme } from "../layout";
import { ProjectsType } from "../../pages/projects";

export const Projects = ({ data }: { data: ProjectsType[] }) => {
  const theme = useTheme();
  const titleColorClasses = {
    blue: "group-hover:text-blue-600 dark:group-hover:text-blue-300",
    teal: "group-hover:text-teal-600 dark:group-hover:text-teal-300",
    green: "group-hover:text-green-600 dark:group-hover:text-green-300",
    red: "group-hover:text-red-600 dark:group-hover:text-red-300",
    pink: "group-hover:text-pink-600 dark:group-hover:text-pink-300",
    purple: "group-hover:text-purple-600 dark:group-hover:text-purple-300",
    orange: "group-hover:text-orange-600 dark:group-hover:text-orange-300",
    yellow: "group-hover:text-yellow-500 dark:group-hover:text-yellow-300",
  };

  return (
    <>
      {data.map((projectData) => {
        const project = projectData.node;
        return (
          <Link
            key={project._sys.filename}
            href={`/projects/` + project._sys.filename}
            className="dark:to-gray-1000 group mb-8 block rounded-md bg-gray-50 bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-10 shadow-sm transition-all duration-150 ease-out last:mb-0 hover:to-gray-50 hover:shadow-md sm:px-8 md:px-10 dark:from-gray-900 dark:hover:to-gray-800"
          >
            <h3
              className={`title-font mb-5 text-3xl font-semibold text-gray-700 transition-all duration-150 ease-out lg:text-4xl dark:text-white ${
                titleColorClasses[theme.color]
              }`}
            >
              {project.title}{" "}
              <span className="hidden opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 lg:inline-block">
                <BsArrowRight className="-mt-1 ml-1 inline-block h-8 w-auto opacity-70" />
              </span>
            </h3>
            <div className="prose dark:prose-dark mb-5 w-full max-w-none opacity-70">
              <TinaMarkdown content={project.excerpt} />
            </div>
            <div>
              <img src={project.heroImg} />
            </div>
          </Link>
        );
      })}
    </>
  );
};

import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import format from "date-fns/format";
import { ProjectType } from "../../pages/projects/[filename]";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const Project = (props: ProjectType) => {
  const theme = useTheme();
  const titleColorClasses = {
    blue: "from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500",
    teal: "from-teal-400 to-teal-600 dark:from-teal-300 dark:to-teal-500",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-300 to-pink-500",
    purple:
      "from-purple-400 to-purple-600 dark:from-purple-300 dark:to-purple-500",
    orange:
      "from-orange-300 to-orange-600 dark:from-orange-200 dark:to-orange-500",
    yellow:
      "from-yellow-400 to-yellow-500 dark:from-yellow-300 dark:to-yellow-500",
  };

  return (
    <Section className="flex-1">
      <Container width="small" className={`flex-1 pb-2`} size="large">
        <h2
          data-tina-field={tinaField(props, "title")}
          className={`title-font relative	mb-8 w-full text-center text-6xl font-extrabold tracking-normal`}
        >
          <span
            className={`bg-gradient-to-r bg-clip-text text-transparent ${
              titleColorClasses[theme.color]
            }`}
          >
            {props.title}
          </span>
        </h2>
      </Container>
      {props.heroImg && (
        <div className="w-full px-4">
          <div
            data-tina-field={tinaField(props, "heroImg")}
            className="relative mx-auto max-w-4xl lg:max-w-5xl"
          >
            <img
              src={props.heroImg}
              className="absolute block h-auto w-full rounded-lg opacity-50 mix-blend-multiply blur-2xl brightness-150 contrast-[0.9] saturate-200 dark:opacity-30 dark:mix-blend-hard-light dark:brightness-150"
              aria-hidden="true"
            />
            <img
              src={props.heroImg}
              alt={props.title}
              className="relative z-10 mb-14 block h-auto w-full rounded-lg opacity-100"
            />
          </div>
        </div>
      )}
      <Container className={`flex-1 pt-4`} width="small" size="large">
        <div
          data-tina-field={tinaField(props, "_body")}
          className="prose dark:prose-dark w-full max-w-none"
        >
          <TinaMarkdown content={props._body} />
        </div>
      </Container>
      <Container width="small" size="small">
        Tags:
        {props.tags?.map((tag, index) => <span> {tag}</span>)}
      </Container>
    </Section>
  );
};

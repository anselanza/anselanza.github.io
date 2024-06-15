import React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import { ProjectType } from "../../pages/projects/[filename]";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Link from "next/link";

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
          className={`title-font relative	mb-8 w-full text-center font-extrabold tracking-normal lg:text-6xl leading-none`}
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
      {props.excerpt && (
        <Container width="small" size="small">
          <TinaMarkdown content={props.excerpt} />
        </Container>
      )}

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
        {props.blocks?.map((block, i) => {
          switch (block.__typename) {
            case "ProjectBlocksVimeo":
              return (
                <React.Fragment key={i + block.__typename}>
                  <div
                    style={{
                      padding: "56.25% 0 0 0",
                      position: "relative",
                      margin: "1em",
                      pointerEvents: "auto"
                    }}
                  >
                    <iframe
                      src={`https://player.vimeo.com/video/${block.id}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      title={block.title}
                    ></iframe>
                  </div>
                  <script src="https://player.vimeo.com/api/player.js"></script>
                </React.Fragment>
              );
            default:
              return null;
          }
        })}
      </Container>
      <Container width="small" size="small">
        Tags:{" "}
        {props.tags?.map((tag, index) => (
          <span key={`span-tag-${index}`}>
            <Link
              className="pointer-events-auto underline text-orange-200"
              key={`tag-${index}`}
              href={`/projects/?tag=${tag}`}
            >
              {tag}
            </Link>{" "}
          </span>
        ))}
      </Container>
    </Section>
  );
};

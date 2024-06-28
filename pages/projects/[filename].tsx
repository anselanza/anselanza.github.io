import { Project } from "../../components/projects/project";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";

export async function generateMetadata({ params }) {
  const title = `Project: ${params.filename}`
  return { title };
}


// Use the props returned by get static props
export default function ProjectPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  if (data && data.project) {
    return (
      <Layout rawData={data} data={data.global}>
        <Project {...data.project} />
      </Layout>
    );
  }
  return (
    <Layout>
      <div>No data</div>;
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.projectQuery({
    relativePath: `${params.filename}.mdx`,
  });
  return {
    props: {
      ...tinaProps,
    },
  };
};

/**
 * To build the Project pages we just iterate through the list of
 * Projects and provide their "filename" as part of the URL path
 */
export const getStaticPaths = async () => {
  const projectsListData = await client.queries.projectConnection();
  return {
    paths: projectsListData.data.projectConnection.edges.map((project) => ({
      params: { filename: project.node._sys.filename },
    })),
    fallback: "blocking",
  };
};

export type ProjectType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["project"];

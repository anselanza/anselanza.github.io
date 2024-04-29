import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { Projects } from "../../components/projects";
import { client } from "../../tina/__generated__/client";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";

export default function ProjectListPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const projects = props.data.projectConnection.edges;

  return (
    <Layout>
      <Section className="flex-1">
        <Container size="large" width="small">
          <h1
            className={`title-font relative	mb-8 w-full text-center font-extrabold tracking-normal lg:text-3xl`}
          >
            Found {projects.length} projects with tag "
            {props.variables.filter.tags.in.join(" ")}"
          </h1>
          <Projects data={projects} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  // console.log({ params });
  const projectsResponse = await client.queries.projectConnection({
    filter: {
      tags: { in: [params.filename] },
    },
  });
  // console.log(projectsResponse.data.projectConnection.edges.length);

  // const tinaProps = await client.queries.pageQuery();
  return {
    props: {
      ...projectsResponse,
    },
  };
};

export type ProjectsType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["projectConnection"]["edges"][number];

export const getStaticPaths = async () => {
  const projectsListData = await client.queries.projectConnection();
  return {
    paths: projectsListData.data.projectConnection.edges.map((project) => ({
      params: { filename: project.node._sys.filename },
    })),
    fallback: "blocking",
  };
};

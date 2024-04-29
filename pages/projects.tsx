import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { Projects } from "../components/projects";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { InferGetStaticPropsType } from "next";
import { useSearchParams } from "next/navigation";

export default function ProjectListPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const params = useSearchParams();
  const tag = params.get("tag");

  const projects = props.data.projectConnection.edges;

  return (
    <Layout>
      <Section className="flex-1">
        <Container size="large" width="small">
          <Projects data={projects} tag={tag} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const projectsResponse = await client.queries.projectConnection();
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

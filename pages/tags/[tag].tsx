import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { Projects } from "../../components/projects";
import { client } from "../../tina/__generated__/client";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const projects = props.data.projectConnection.edges;

  return (
    <Layout>
      <Section className="flex-1">
        <Container size="large" width="small">
          <Projects data={projects} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.pageQuery();
  return {
    props: {
      ...tinaProps,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: false };
};

export type ProjectsType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["projectConnection"]["edges"][number];

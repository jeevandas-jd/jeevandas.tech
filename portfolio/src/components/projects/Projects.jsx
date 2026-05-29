import { Section } from '../common/Section';
import { ProjectCard } from './ProjectCard';

export function Projects({ projects }) {
  return (
    <Section id="projects" label="projects">
      <p
        style={{
          fontSize: 11,
          color: "#aaa49c",
          marginBottom: 16,
          letterSpacing: "0.06em",
        }}
      >
        click + to expand technical details
      </p>
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </Section>
  );
}
import { useActiveSection } from '../hooks/useActiveSection';
import { Navbar } from '../components/navbar/Navbar';
import { Hero } from '../components/hero/Hero';
import { Experience } from '../components/experience/Experience';
import { Projects } from '../components/projects/Projects';
import { Skills } from '../components/skills/Skills';
import { Education } from '../components/education/Education';
import { Footer } from '../components/footer/Footer';
import { LeetCodeHeatmap } from '../components/leetcode/LeetcodeHeatmap';
import { portfolioData } from '../data/portfolioData';

export function Portfolio() {
  const sections = ["about", "experience", "projects", "skills", "education", "leetcode"];
  const active = useActiveSection(sections);

  return (
    <div style={{ background: "#faf8f5", minHeight: "100vh" }}>
      <Navbar active={active} items={sections} />
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 2rem" }}>
        <Hero data={portfolioData} />
        <Experience experience={portfolioData.experience} />
        <Projects projects={portfolioData.projects} />
        <Skills skills={portfolioData.skills} />
        <Education education={portfolioData.education} />
        
        {/* LeetCode Section */}
        <section id="leetcode" style={{ padding: "4rem 0", borderTop: "1px solid #e8e3dc" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "140px 1fr",
            gap: "2rem",
            alignItems: "start",
          }}>
            <div style={{ paddingTop: 4, position: "sticky", top: 80 }}>
              <p style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 15,
                color: "#aaa49c",
                letterSpacing: "0.04em",
              }}>
                leetcode
              </p>
            </div>
            <div>
              <LeetCodeHeatmap username="jeevandas-787" />
            </div>
          </div>
        </section>
        
        <Footer data={portfolioData} />
      </div>
    </div>
  );
}
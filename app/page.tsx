import DigitalTwinChat from "./components/digital-twin-chat";

export default function Home() {
  const strengths = [
    "Java 8+",
    "Spring Boot",
    "Microservices",
    "Temporal Workflows",
    "Apache Kafka",
    "MongoDB",
    "OracleDB",
    "AWS (EC2, Lambda, S3, Secrets Manager)",
  ];

  const impactHighlights = [
    "Senior Backend Developer at HSBC Technology India (since 2 Mar 2026)",
    "4+ years enterprise backend foundation built at Infosys (until 27 Feb 2026)",
    "75%+ test coverage with JUnit and Mockito",
    "End-to-end ownership of Punch System backend for Apple Store workflows",
    "JDK 17 to JDK 21 migration across multiple microservices",
  ];

  const milestones = [
    {
      period: "Mar 2026 - Present",
      role: "Senior Backend Developer, HSBC Technology India",
      detail:
        "Building secure, highly available backend platforms for banking-grade workloads with an emphasis on reliability, compliance-ready engineering, and scalable service architecture.",
    },
    {
      period: "Sep 2021 - Feb 2026",
      role: "Specialist Programmer, Infosys",
      detail:
        "Delivered enterprise-grade backend systems with scalable API architecture, resilient service patterns, and production-focused observability.",
    },
    {
      period: "Major Project Ownership",
      role: "Punch System Backend - Apple Store Workflows",
      detail:
        "Sole ownership of backend implementation from design through production rollout, driving reliability and streamlined workforce operations.",
    },
    {
      period: "Platform Excellence",
      role: "Service Reliability and Runtime Modernization",
      detail:
        "Implemented reliability improvements, fault-tolerant workflow orchestration using Temporal, and led JDK modernization initiatives.",
    },
    {
      period: "2017 - 2021",
      role: "B.Tech, Information Technology (CGPA 8.82/10)",
      detail:
        "Built strong computing foundations at Oriental Institute of Science & Technology, Bhopal.",
    },
  ];

  const certifications = [
    "Infosys Certified Spring Boot Developer",
    "Infosys Certified Java SE8 Developer",
    "Infosys Certified Kafka Developer",
    "Infosys Certified Python Developer",
    "Microsoft Technology Associate in Python",
  ];

  const awards = [
    "Best Performer Award for technical excellence and ownership",
    "Recognized twice as Interviewer Panelist for technical hiring",
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-6 pb-20 pt-10 sm:px-10 lg:px-16">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/85 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_44%),radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.14),transparent_40%)]" />
        <div className="relative flex flex-col gap-10">
          <div className="grid gap-4 rounded-2xl border border-cyan-300/15 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 p-4 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-200/80">
                Current Role
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Senior Backend Developer
              </p>
              <p className="text-xs text-zinc-300">HSBC Technology India</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-200/80">
                Joined
              </p>
              <p className="mt-1 text-sm font-semibold text-white">2 Mar 2026</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-200/80">
                Previous
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Infosys (till 27 Feb 2026)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="w-fit rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Senior Enterprise Backend Engineer
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Suman Kumar
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-zinc-300">
              Spring Boot microservice Java backend developer building
              enterprise-level platforms with production-grade resiliency and
              fault-tolerant orchestration. Currently contributing as a Senior
              Backend Developer at HSBC Technology India.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {strengths.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-1.5 text-sm text-zinc-200"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:kumarsuman99340@gmail.com"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:scale-[1.02] hover:bg-cyan-200"
            >
              Contact Me
            </a>
            <a
              href="https://www.linkedin.com/in/suman-kumar-92166917a"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-600 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:border-cyan-400 hover:text-cyan-200"
            >
              LinkedIn Profile
            </a>
            <a
              href="/Suman_resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-rose-400/40 bg-rose-500/10 px-6 py-3 text-sm font-semibold text-rose-100 transition hover:border-rose-300 hover:bg-rose-500/20"
            >
              Open Suman Resume (PDF)
            </a>
            <a
              href="/Profile.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-600 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:border-cyan-400 hover:text-cyan-200"
            >
              Open LinkedIn Export (PDF)
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {impactHighlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-zinc-800 bg-zinc-950/55 p-4 text-sm text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-5">
        <article className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8 lg:col-span-2">
          <h2 className="text-2xl font-semibold text-white">About Me</h2>
          <p className="mt-4 leading-relaxed text-zinc-300">
            I specialize in Java backend engineering with Spring Boot and
            microservices, focusing on enterprise reliability, scalability, and
            secure integrations. I enjoy translating business complexity into
            robust APIs and maintainable service ecosystems.
          </p>
          <p className="mt-4 leading-relaxed text-zinc-400">
            Current role: Senior Backend Developer at HSBC Technology India
            (joined 2 Mar 2026). Previously Specialist Programmer at Infosys
            until 27 Feb 2026, with strong ownership across design,
            implementation, testing, and production readiness.
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8 lg:col-span-3">
          <h2 className="text-2xl font-semibold text-white">Career Journey</h2>
          <div className="mt-6 space-y-6">
            {milestones.map((milestone) => (
              <div
                key={`${milestone.role}-${milestone.period}`}
                className="relative rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  {milestone.period}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-zinc-100">
                  {milestone.role}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {milestone.detail}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8">
          <h2 className="text-2xl font-semibold text-white">
            Certifications & Recognition
          </h2>
          <div className="mt-5 space-y-3">
            {certifications.map((certification) => (
              <p
                key={certification}
                className="rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 text-sm text-zinc-300"
              >
                {certification}
              </p>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            {awards.map((award) => (
              <p
                key={award}
                className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-3 text-sm text-cyan-100"
              >
                {award}
              </p>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-zinc-900/70 p-8">
          <h2 className="text-2xl font-semibold text-white">Technical Stack</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {strengths.map((skill) => (
              <div
                key={`stack-${skill}`}
                className="rounded-xl border border-zinc-800 bg-zinc-950/50 px-4 py-3 text-sm text-zinc-300"
              >
                {skill}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-900 to-zinc-950 p-8">
        <h2 className="text-2xl font-semibold text-white">
          Portfolio & Next Iterations
        </h2>
        <p className="mt-3 max-w-3xl text-zinc-300">
          This section is designed as a premium showcase for enterprise
          initiatives, architecture case studies, and measurable delivery
          impact. Add project links and public artifacts as your portfolio
          evolves.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-cyan-400 hover:text-cyan-200"
          >
            Project Link 01 (Add URL)
          </a>
          <a
            href="#"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-cyan-400 hover:text-cyan-200"
          >
            Project Link 02 (Add URL)
          </a>
          <a
            href="#"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-cyan-400 hover:text-cyan-200"
          >
            Architecture Case Study (Add URL)
          </a>
          <a
            href="/Suman_resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-cyan-400 hover:text-cyan-200"
          >
            Resume PDF (Suman)
          </a>
          <a
            href="/Profile.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-cyan-400 hover:text-cyan-200"
          >
            LinkedIn Profile PDF
          </a>
        </div>
      </section>

      <DigitalTwinChat />
    </main>
  );
}

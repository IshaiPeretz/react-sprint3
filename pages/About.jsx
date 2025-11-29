import "../../assets/css/pages/About.css";

export function About() {
  return (
    <section className="about">
      <h2>About This Project</h2>

      <p>
        This app was built as part of our studies at{" "}
        <strong>Coding Academy</strong>. It includes both <strong>Mail</strong>{" "}
        and <strong>Notes</strong> services, allowing users to better manage
        their busy life and daily schedule.
      </p>

      <p>
        Through this project we learned how to work as a team, how to organize a
        multi-app system, and how to improve our skills with{" "}
        <strong>React</strong>.
      </p>

      <h3>👨‍💻 The Creators</h3>

      <div className="creators">
        <div className="creator-card">
          <img src="../../assets/img/ishai.jpg" alt="Ishai Peretz" />
          <h4>Ishai Peretz</h4>
          <p>
            Coding Academy student, always improving and aiming high. Ready to
            pursue a career in software development.
          </p>
        </div>

        <div className="creator-card">
          <img src="../../assets/img/roy.jpg" alt="Roy Sonnenberg" />
          <h4>Roy Sonnenberg</h4>
          <p>
            Student at Coding Academy. Passionate about becoming the best
            full-stack developer possible and continuing to grow.
          </p>
        </div>
      </div>
    </section>
  );
}

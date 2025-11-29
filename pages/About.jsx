import "../../assets/css/pages/About.css"

import ishaiImg from "../../assets/img/ishai.jpg"
import royImg from "../../assets/img/roy.jpg"

export function About() {
  return (
    <section className="about">
      <h2>About This Project</h2>

      <p>
        This application was built as part of our studies at{" "}
        <strong>Coding Academy</strong>. It includes both <strong>Mail</strong>{" "}
        and <strong>Notes</strong> services, helping users organize tasks,
        messages, and daily routines.
      </p>

      <p>
        Throughout the project, we learned how to collaborate as a team,
        structure a multi-app system, and strengthen our skills in{" "}
        <strong>React</strong>.
      </p>

      <h3>👨‍💻 The Creators</h3>

      <div className="creators">
        <div className="creator-row">
          <img
            className="creator-img"
            src={ishaiImg}
            alt="Ishai Peretz"
          />

          <div className="creator-text">
            <h4>Ishai Peretz</h4>
            <p>
              Coding Academy student, always improving and aiming high, working
              toward becoming the best full-stack developer possible.
            </p>
          </div>
        </div>

        <div className="creator-row">
          <img
            className="creator-img"
            src={royImg}
            alt="Roy Sonnenberg"
          />

          <div className="creator-text">
            <h4>Roy Sonnenberg</h4>
            <p>
              Passionate student at Coding Academy, striving for excellence and
              planning to pursue a strong career in software development.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

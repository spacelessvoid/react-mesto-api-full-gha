import { Link } from "react-router-dom";

const PageNotFound = () => (
  <section
    className="content"
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
      color: "#fff",
    }}
  >
    <h2>404</h2>
    <p>Страница не найдена</p>
    <Link className="link" to="/">
      Назад
    </Link>
  </section>
);

export default PageNotFound;

import { Link } from "react-router-dom";

const PageNotFound = () => (
  <section className="content page-not-found">
    <h2>404</h2>
    <p>Страница не найдена</p>
    <Link className="link" to="/">
      Назад
    </Link>
  </section>
);

export default PageNotFound;

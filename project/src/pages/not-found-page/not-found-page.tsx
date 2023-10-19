import {Link} from 'react-router-dom';
import HeaderNav from '../../components/header-nav/header-nav';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      <HeaderNav />
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">NotFoundPage</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">404 Not Found</b>
              <Link to ="/">Вернуться на главную</Link>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default NotFoundPage;

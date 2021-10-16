import { Link } from "react-router-dom";
import routes from "../routes";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={routes.home}>Home</Link>
          </li>
          <li>
            <Link to={routes.admin}>Admin</Link>
          </li>
          <li>
            <Link to={routes.bakery}>Bakery</Link>
          </li>
          <li>
            <Link to={routes.chat}>Chat</Link>
          </li>
          <li>
            <Link to={routes.manual}>Manual</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

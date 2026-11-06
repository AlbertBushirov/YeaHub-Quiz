import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to="/collections">Вернуться к коллекциям</Link>
    </div>
  );
}

import { Movie } from "./components/Movie";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/moviesearch/movies/:id',
    element: <Movie />
  },
  {
    path: '*',
    element: <Home />
  }
];

export default AppRoutes;

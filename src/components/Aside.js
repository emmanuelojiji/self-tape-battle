import "./Aside.scss"
import { Link } from "react-router-dom";

const Aside = () => {
    return (
        <aside>
        <Link to="/home/battles">Battles</Link>
        <Link to="/home/leaderboard">Leaderboard</Link>
        <Link>Shop</Link>
        <Link>Green Room</Link>
      </aside>
    );
};

export default Aside;
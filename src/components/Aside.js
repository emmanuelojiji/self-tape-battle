import "./Aside.scss"
import { Link } from "react-router-dom";
import Logo from "../media/logo.svg"

const Aside = () => {
    return (
        <aside>
          <img src={Logo} className="logo"/>
          <nav>
        <Link to="/home/battles">Arena</Link>
        <Link to="/home/leaderboard">Leaderboard</Link>
        <Link>Shop</Link>
        <Link>Green Room</Link>
        </nav>
    
      </aside>
    );
};

export default Aside;
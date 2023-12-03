
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage"
import {Logo} from "../components";
import {Link} from "react-router-dom"


const Landing = () => {
  return (
    <Wrapper>
      <nav>
       <Logo/>
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            I'm baby gentrify woke dreamcatcher 3 wolf moon +1 kale chips
            neutra, affogato cronut. Tonx small batch before they sold out
            flexitarian selvage, green juice waistcoat schlitz. Church-key JOMO
            keytar activated charcoal, locavore brunch hell of squid.
          </p>
          <Link to="/register" className="btn btn-hero">Login/Register</Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};






export default Landing;

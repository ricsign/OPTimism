import React from 'react';
import './HomePage.css';

const HomePage = () => {
    const useState = React.useState;
    const useEffect = React.useEffect;

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    
  return (
    <div className="parallax-page">

    <nav>
        <div class="menu">
        <p class="website_name">OPTimism</p>
            <div class="menu_links">
                <a href="" class="link">Analytics</a>
                <a href="" class="link">Leaderboard</a>
                <a href="" class="link">Rewards</a>
                <a href="" class="link">Donate</a>
                <a href="" class="link">Log Out</a>
            </div>
            <div class="menu_icon" id="menuIcon">
                <span class="icon"></span>
            </div>
        </div>
    </nav>



      <section className="wrapper">
        <div className="container">
        <div id="scene" class="scene" data-hover-only="false">


<div class="circle" data-depth="1.2"></div>

<div class="one" data-depth="0.9">
    <div class="content">
        <span class="piece"></span>
        <span class="piece"></span>
        <span class="piece"></span>
    </div>
</div>

<div class="two" data-depth="0.60">
    <div class="content">
        <span class="piece"></span>
        <span class="piece"></span>
        <span class="piece"></span>
    </div>
</div>

<div class="three" data-depth="0.40">
    <div class="content">
        <span class="piece"></span>
        <span class="piece"></span>
        <span class="piece"></span>
    </div>
</div>

<p class="p404" data-depth="0.50">OPTimism</p>
<p class="p404" data-depth="0.10">OPTimism</p>

</div>
          <div className="text">
            <article>
              <p>Guarding Vision, <br /> One Frame at a Time </p>
              <button>Start Eye Exercise</button>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

import classes from "./HelpUs.module.css";
import HelpUsTitle from "./HelpUsTitle";

import { HomeOutlined } from "@ant-design/icons";

const HelpUs = () => {
  return (
    <section className={classes.HelpUs}>
      <HelpUsTitle />
      <p className={classes.HelpUsParagraph}>
        Every contribution brings the gift of sight closer to those in need.
        Your support funds life-changing initiatives, restoring vision in
        third-world nations. Join us in illuminating lives with hope and
        clarity.{" "}
      </p>
      <HomeOutlined
        className="mt-10 text-white text-2xl text-gray-800 font-extrabold hover:scale-150 transition-transform duration-300 translate-y-[-3px]"
        onClick={() => (window.location.href = "/home")}
      />
    </section>
  );
};

export default HelpUs;

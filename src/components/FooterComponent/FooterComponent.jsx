import "./FooterComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
const FooterComponent = () => {
  return (
    <div className="container">
      <div id="footer">
        <div>
          <FontAwesomeIcon icon={faCopyright} className="icon-copy" />
          Web Design Creator - Noa Bar-on
        </div>
        <div>
          <FontAwesomeIcon icon={faEnvelope} />
          noaB-O@web_creator.com
        </div>
        <div>
          <FontAwesomeIcon icon={faBuilding} />
          Herzel 57, Ramat-Gan, Israel
        </div>
        <div>
          <FontAwesomeIcon icon={faPhone} />
          0545-669857
        </div>
      </div>
    </div>
  );
};
export default FooterComponent;

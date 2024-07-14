import { TMember } from "@/interface/TMember";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa6";


const Team_Member_Card = ({ member }:{member:TMember}) => {
  const { name, role, image } = member;

  return (
    <div>
      <div className=" flex justify-center items-center">
        <img
          src={image}
          alt=""
          className="rounded-md transform transition-transform duration-300 ease-in-out hover:scale-105 "
        />
      </div>
      <div className="text-center space-y-2 mt-2">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <span className="text-gray-300">{role}</span>
        <div className="flex items-center justify-center gap-5">
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
          <FaPinterest />
        </div>
      </div>
    </div>
  );
};

export default Team_Member_Card;

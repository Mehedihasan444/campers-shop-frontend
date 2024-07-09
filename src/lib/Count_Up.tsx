import CountUp from "react-countup";

const Count_Up = ({ value }:any) => {
  return (
    <>
      <CountUp start={0} end={value} duration={2.75} suffix="M+"></CountUp>
    </>
  );
};

export default Count_Up;

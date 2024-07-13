import {useWindowSize} from 'react-use';
import Confetti from 'react-confetti'



const SuccessAnimation = () => {
    const { width, height } = useWindowSize()
    return (
     
            <Confetti
      width={width}
      height={height}
    />
 
    );
};

export default SuccessAnimation;
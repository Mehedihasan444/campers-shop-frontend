
import GridLoader from "react-spinners/GridLoader";



const Loading =({loading}:{loading:boolean})=> {

  return (
    <div className="sweet-loading w-full ">
 
      <GridLoader  color={'#22c55e'}
        loading={loading}
        size={25}
        aria-label="Loading Spinner"
        data-testid="loader"/>
    </div>
  );
}


export default Loading;
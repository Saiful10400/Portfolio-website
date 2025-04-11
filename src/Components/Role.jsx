import { useNavigate } from "react-router-dom";

 

const Role = () => {

const move=useNavigate()


const onHandle=()=>{
localStorage.setItem("role","admin")
move("/")
}

const offHandle=()=>{
localStorage.removeItem("role")
move("/")
}




    return (
        <div className="flex justify-center items-center gap-3">
            <button className="btn btn-success btn-sm text-white" onClick={onHandle}>Turn on</button>
            <button className="btn btn-error btn-sm text-white" onClick={offHandle}>Turn off</button>
 
        </div>
    );
};

export default Role;
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react' ;

function Home() {

    let navigate = useNavigate();

    useEffect(()=>{
        window.addEventListener('beforeunload', () => {
          localStorage.setItem('lastVisitedPage', window.location.pathname);
        });
      })

    return(

        <div >

            <button onClick={()=>{navigate("/login")}}>
                login
            </button>

            <button onClick={()=>{navigate("/signup")}}>
                signup
            </button>

        </div>    
    )
}

export default Home
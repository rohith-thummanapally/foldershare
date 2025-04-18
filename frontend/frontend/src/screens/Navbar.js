import logo from '../assets/logo.png';

export default function Navbar()
{
    return (
        <div style={{maxWidth:'100%',height:'70px',backgroundColor:'#a0a0f9' ,display:'flex',flexdirection:'row',alignItems:'center',padding:'0px 50px'}}>
            <img src={logo} style={{height:'50px',width:'50px'}} />
            <p style={{fontSize:20,fontWeight:'700'}}>&nbsp;PhotoFolio</p>
        </div>
    )
}
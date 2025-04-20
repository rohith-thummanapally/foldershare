import {useState,useEffect} from 'react';
import { folderstate, getfolders,addfolder } from "../redux/folderSlice.js";
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { folderreducer,folderactions } from '../redux/folderSlice.js';
import imageicon from '../assets/imageicon.png';
import Navbar from './Navbar.js';
export default function Folderspage()
{
    const [showaddfolder,toogleaddfolder]=useState(false);
    const navigate=useNavigate();
    let dispatch=useDispatch();
    let {activefolder,folderslist}=useSelector(folderstate);
    useEffect(()=>{
        dispatch(getfolders());
    },[]);

    function openfolder(folderid)
    {
        console.log(folderid);
        dispatch(folderactions.updateactivefolder(folderid));
        navigate('/files');
    }
    function createnewfolder(e)
    {
        e.preventDefault();
        console.log(e.target[0].value);
        dispatch(addfolder({"foldername":e.target[0].value}));
    }
    function GetList()
    {
        return (
            <div style={{...Styles.container,gridGap:'10px',gridRowGap:'30px'}} >
            {
                folderslist.map((item,index)=>{
                    return (
                    <div onClick={()=>{openfolder(item['id'])}} key={index} style={{height:'100%',padding:'10px',backgroundColor:'lightgray',borderRadius:'5px 5px 0px 0px'}}> 
                        <div style={{backgroundColor:'#fff',height:'75%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <img src={imageicon} style={{height:'25px',width:'25px'}} />
                        </div>
                        <div style={{height:'25%'}}>
                            <p>{item['name']}</p>
                        </div>
                    </div>
                    )
                })       
            }
            </div>
        );
    }
    function CreateFolder()
    {
        return (
            <div style={{margin:'0px 20%',paddingLeft:'30px',marginTop:'30px',minHeight:'30%',maxWidth:'100%',borderRadius:'10px',backgroundColor:'#f4f4f4',boxShadow:'4px 4px 4px 2px #f4f4f4'}}>
                <p style={{fontSize:'1.7rem',fontWeight:'700',paddingTop:'20px'}}>Create an Album</p>
                <form onSubmit={(e)=>{createnewfolder(e)}}>
                <div style={{display:'flex',flexDirection:'row',paddingBottom:'20px'}}>
                    <input type="text" placeholder='Album Name' required style={{width:'60%',height:'40px',border:'none',borderRadius:'20px',paddingLeft:'15px',fontSize:'16px',boxShadow:'2px 2px 8px 0 #0000003d'}}/>
                    <input type="button" value="Clear" style={{marginLeft:'20px',fontSize:'16px',color:'#fff',backgroundColor:'#ff1300',width:'90px',border:'none',borderRadius:'13px',boxShadow:'2px 2px 4px 0 #0000003d'}} />
                    <input type="submit" value="Create" style={{marginLeft:'20px',fontSize:'16px',color:'#fff',backgroundColor:'#07f',width:'90px',border:'none',borderRadius:'13px',boxShadow:'2px 2px 4px 0 #0000003d'}} />
                    
                </div>
                </form>
            </div>
        )
    }
    return (
        <>
        <Navbar />
        {showaddfolder &&
        <CreateFolder />
        }
        <div style={{padding:'0px 12.5%',marginTop:'30px',minHeight:'30%',maxWidth:'100%'}}>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <p>
                    Your Albums
                </p>
                <input type="button" style={{}} onClick={()=>{toogleaddfolder(!showaddfolder)}} value="Add Album"/>
            </div>
            <div>
                <GetList />
            </div>

        </div>
        </>
    )
}

const Styles={
    'container':{
        display:'grid',
        gridTemplateColumns:'repeat(5,1fr)',
        height:'100vh',
        gridAutoRows:'25%'
    }
}
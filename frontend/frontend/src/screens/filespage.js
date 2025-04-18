import Navbar from "./Navbar";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import back from "../assets/back.png";
import { useNavigate } from "react-router-dom";
import imageicon from '../assets/imageicon.png';
import { folderactions,folderstate } from "../redux/folderSlice";
import { fileReducers,filestate,fileactions,addfile,folderfiles } from "../redux/fileSlice";
export default function Filespage()
{
    const [addfileview,toogleaddfile]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    let {activefolder}=useSelector(folderstate);
    let {folderid,foldername,filesList,selectedfile}=useSelector(filestate);
    useEffect(
        ()=>{
        dispatch(folderfiles({'folderid':activefolder}));
    },[]);
    function createnewfile(e)
    {
        e.preventDefault();
    }
    function Addfileview()
    {
        return (
            <div style={{margin:'0px 20%',paddingLeft:'30px',marginTop:'30px',minHeight:'30%',maxWidth:'100%',borderRadius:'10px',backgroundColor:'#f4f4f4',boxShadow:'4px 4px 4px 2px #f4f4f4'}}>
                <p style={{fontSize:'1.7rem',fontWeight:'700',paddingTop:'20px'}}>Add Image to {foldername}</p>
                <form onSubmit={(e)=>{createnewfile(e)}}>
                
                    <input type="text" placeholder='Title' required style={{width:'90%',height:'40px',border:'none',borderRadius:'20px',paddingLeft:'15px',margin:'10px 0px',fontSize:'16px',boxShadow:'2px 2px 8px 0 #0000003d'}}/>
                    <input type="text" placeholder='Image Url' required style={{width:'90%',height:'40px',border:'none',borderRadius:'20px',paddingLeft:'15px',margin:'10px 0px',fontSize:'16px',boxShadow:'2px 2px 8px 0 #0000003d'}}/>
                    <div style={{display:'flex',flexDirection:'row',paddingBottom:'20px',justifyContent:'space-evenly'}}>
                        <input type="button" value="Clear" style={{marginLeft:'20px',fontSize:'16px',color:'#fff',backgroundColor:'#ff1300',width:'90px',aspectRatio:'2.5',border:'none',borderRadius:'13px',boxShadow:'1px 1px 2px 0 #0000003d'}} />
                        <input type="submit" value="Add" style={{marginLeft:'20px',fontSize:'16px',color:'#fff',backgroundColor:'#07f',width:'90px',border:'none',borderRadius:'13px',boxShadow:'1px 1px 2px 0 #0000003d'}} />
                    </div>
                </form>
            </div>
        );
    }
    function openfile()
    {

    }
    function GetList()
    {
        console.log('in files ');
        console.log(filesList);
        console.log('ehllo');
        return (
            <div style={{...Styles.container,gridGap:'10px',gridRowGap:'30px'}} >
                        {filesList && filesList.length ?
                            filesList.map((item,index)=>{
                                return (
                                <div className="fileItem" onClick={()=>{openfile(item['id'])}} key={index} style={{aspectRatio:2,padding:'10px',backgroundColor:'lightgray',borderRadius:'5px 5px 0px 0px'}}> 
                                    <div style={{backgroundColor:'#fff',height:'80%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        <img src={imageicon} style={{height:'25px',width:'25px'}} />
                                    </div>
                                    <div style={{height:'20%'}}>
                                        <p>{item['filename']}</p>
                                    </div>
                                </div>
                                )
                            })       
                            :
                            ''
                        }
            </div>
        );
    }
    return (
        <div>
            <Navbar />
            <div style={{padding:'0px 12.5%',marginTop:'30px',minHeight:'30%',maxWidth:'100%'}}>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <span onClick={()=>{navigate('/')}} style={{aspectRatio:'1',background:'#fcfcfc',borderRadius:'50%',boxShadow:'0 3px 8px #0000003d',width:'50px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <img src={back} style={{width:'30px'}}/>
                </span>
                <p style={{fontSize:'1.7rem',fontWeight:'700'}}>
                    {filesList.length>0 ?
                        'Images in Album '.foldername
                    : 'No Images Found in the Album'} 
                </p>
                {!addfileview ?
                <input type="button" style={{backgroundColor:'#0077ff1a',border:'2px solid #07f',borderRadius:'5px',color:'#07f',fontWeight:'700',padding:'5px 10px'}} onClick={()=>{toogleaddfile(!addfileview)}} value="Add Image"/>
                :
                <input type="button" value="Cancel" onClick={()=>{toogleaddfile(!addfileview)}} style={{backgroundColor:'#ff13001a', color:'#ff1300', border:'2px solid #ff1300',fontWeight:'700',borderRadius:'5px',padding:'5px 10px'}} />
                }   
            </div>
            {addfileview &&
                <Addfileview
                />
            }
            <div>
                <GetList />
            </div>

        </div>
        </div>
    )
}

const Styles={
    'container':{
        display:'grid',
        gridTemplateColumns:'repeat(3,1fr)',
        height:'100vh',
        gridAutoRows:'30%'
    }
}
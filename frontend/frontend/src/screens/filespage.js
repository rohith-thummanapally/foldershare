import Navbar from "./Navbar";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import back from "../assets/back.png";
import { useNavigate } from "react-router-dom";
import imageicon from '../assets/imageicon.png';
import { folderactions,folderstate } from "../redux/folderSlice";
import { fileReducers,filestate,fileactions,addfile,folderfiles,deletefile } from "../redux/fileSlice";
import _ from 'lodash';
export default function Filespage()
{
    const [addfileview,toogleaddfile]=useState(false);
    const [hoveredindex,sethoveredindex]=useState('');
    const [updatefile,setupdatefile]=useState(0);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    let {activefolder}=useSelector(folderstate);
    let {folderid,foldername,filesList,selectedfile}=useSelector(filestate);
    useEffect(
        ()=>{
        dispatch(folderfiles({'folderid':activefolder}));
    },[]);
    let createnewfiledebounced=_.debounce(createnewfile,1000,{leading:true,maxWait:'2000',trailing:true});
    function createnewfile(e)
    {
        e.preventDefault();
        dispatch(addfile({'name':e.target[0].value,'fileurl':e.target[1].value,'folderid':folderid}));
        toogleaddfile((prevstate)=>!prevstate);
    }
    function Addfileview()
    {
        return (
            <div style={{margin:'0px 20%',paddingLeft:'30px',marginTop:'30px',minHeight:'30%',maxWidth:'100%',borderRadius:'10px',backgroundColor:'#f4f4f4',boxShadow:'4px 4px 4px 2px #f4f4f4'}}>
                <p style={{fontSize:'1.7rem',fontWeight:'700',paddingTop:'20px'}}>Add Image to {foldername}</p>
                <form onSubmit={(e)=>{createnewfiledebounced(e)}}>
                
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
    function updatefilefun(fileid,filename,fileurl)
    {

    }
    function deletefilefun(fileid,folderid)
    {
        console.log('in delete file function');
        dispatch(deletefile({'fileid':fileid,'folderid':folderid}));
    }
    function GetList()
    {
        return (
            <div style={{...Styles.container,gridGap:'10px',gridRowGap:'30px'}} >
                        {filesList && filesList.length ?
                            filesList.map((item,index)=>{
                                return (
                                <div className="fileItem" style={{...Styles.fileItem,position:'relative'}} onMouseEnter={()=>{sethoveredindex(index)}} onMouseLeave={()=>{sethoveredindex('')}} onClick={()=>{openfile(item['id'])}} key={index} > 
                                    <div style={{backgroundColor:'#fff',height:'80%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        <img src={imageicon} style={{height:'25px',width:'25px'}} />
                                    </div>
                                    <div style={{height:'20%'}}>
                                        <p>{item['filename']}</p>
                                    </div>
                                    {
                                        hoveredindex==index && 
                                        (
                                            <div style={{position:'absolute',right:'0px',top:'-10px',display:'flex',flexDirection:'row'}}>
                                                <buttton>
                                                    <img src={imageicon} onClick={()=>{updatefilefun(item['fileid'],item['filename'],item['fileurl'])}} style={{...Styles.buttonstyle,backgroundColor:'blue'}} />
                                                </buttton>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <button>
                                                    <img src={imageicon} onClick={()=>{deletefilefun(item['id'],item['folderid']);}} style={{...Styles.buttonstyle,backgroundColor:'red'}} />
                                                </button>
                                            </div>
                                        )
                                    }
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
    },
    'fileItem':{
        aspectRatio:2,
        padding:'10px',
        backgroundColor:'lightgray',
        borderRadius:'5px 5px 0px 0px'
    },
    'buttonstyle':{
        borderRadius:'50%',
        height:'25px',
        width:'25px'
    }
}
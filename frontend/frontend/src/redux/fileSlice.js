import { createAsyncThunk ,createSlice} from "@reduxjs/toolkit";


export const folderfiles=createAsyncThunk('getfiles',
    async (args,thunkAPI)=>{
        try{
            console.log(args);
            console.log('in get folderfiles thunk'+args['folderid']);
            let folderid=args['folderid'];
            console.log(`http://localhost:3400/api/file/${folderid}`);
            thunkAPI.dispatch(fileactions.updateselfolder(folderid));
            await fetch(`http://localhost:3400/api/file/${folderid}`,{method:'GET'})
                .then(res=>res.json())
                .then(result=>{
                    console.log(result.data);
                    thunkAPI.dispatch(fileactions.updatefolderfiles({'fileslist':result.data}))
                });
        }
        catch(err)
        {
            console.log(err);
        }
    }
)

export const addfile=createAsyncThunk('addfile',
    async (args,thunkAPI)=>{
        try
        {
            console.log('in add file thunk');
            console.log(args);
            let name=args['name'];
            let fileurl=args['fileurl'];
            let folderid=args['folderid'];
            let data=new FormData();
            data.append('name',name);
            data.append('fileurl',fileurl);
            data.append('folderid',folderid);
            console.log(data);
            await fetch('http://localhost:3400/api/file/addfile',{
                    method:'post',
                    body:data
                }
            )
            .then(res=>res.json())
            .then(result=>{
                console.log('in add file thunk result');
                console.log(result);
                thunkAPI.dispatch(folderfiles({'folderid':folderid}))
            })
            
        }
        catch(err)
        {
            console.log(err);
        }
    }
);

export const deletefile=createAsyncThunk('deleteFile',
    async (args,thunkAPI)=>{
        try{
            console.log(args);
            let fileid=args['fileid'];
            let folderid=args['folderid'];
            let data=new FormData();
            data.append('fileid',fileid);
            console.log(data);
            await fetch('http://localhost:3400/api/file/deletefile',{
                method:'post',
                body:data
            })
                .then(res=>res.json())
                .then(result=>{
                    console.log(result);
                });
            thunkAPI.dispatch(folderfiles({'folderid':folderid}))
        }
        catch(err)
        {
            console.log(err);
        }
})

let inistate={folderid:null,foldername:'',filesList:[],selectedfile:null}
const fileSlice=createSlice({
    name:'files',
    initialState:inistate,
    reducers:{
        'updateselfile':(state,action)=>{
            state.selectedfile=action.payload;
        },
        'updatefolderfiles':(state,action)=>{
            state.filesList=action.payload['fileslist'];
        },
        'updateselfolder':(state,action)=>{
            state.folderid=action.payload;
        } 
    }
});

export const fileReducers=fileSlice.reducer;
export const fileactions=fileSlice.actions;
export const filestate=(store)=>store.fileReducers;
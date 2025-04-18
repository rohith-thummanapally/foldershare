import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

export const getfolders=createAsyncThunk('getfolders',
    async (args,thunkAPI)=>{
        try{
            console.log('in getfolders thunk');
            await fetch('http://localhost:3400/api/folder/')
                    .then(res=>(res.json()))
                    .then(result=>{
                        console.log('hi');
                        console.log(result);
                        thunkAPI.dispatch(folderactions.getfolders({'allfolders':result['data']}));
                    })
            //console.log(result);
            //thunkAPI.dispatch({'allfolders':res});
        }
        catch(err)
        {
            console.log(err);
        }
    }
);

export const addfolder=createAsyncThunk('addfolder',
    async (args,thunkAPI)=>{
        console.log('in add folder thunk');
        try
        {
            let foldername=args['foldername'];
            let data=new FormData();
            data.append('name',foldername);
            await fetch('http://localhost:3400/api/folder/addfolder',{
                method:'post',
                body:data
            }).
            then(res=>res.json)
            .then(result=>{
                console.log(result);
            });
            thunkAPI.dispatch(getfolders());
        }
        catch(err)
        {
            console.log(err);
        }
    }
)

let initialState={activefolder:'',folderslist:[]}
export const folderSlice=createSlice({
    name:'folderslice',
    initialState:initialState,
    reducers:{
        'updateactivefolder':(state,action)=>{
            state.activefolder=action.payload;
        },
        'getfolders':(state,action)=>{
            console.log(action.payload['allfolders']);
            state.folderslist=action.payload['allfolders'];
        }
    }
});
export const folderreducer=folderSlice.reducer;
export const folderactions=folderSlice.actions;
export const folderstate=(store)=>store.folderreducer;
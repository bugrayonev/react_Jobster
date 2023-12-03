import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import {addUserToLocalStorage,removeUserFromLocalStorage,getUserFromLocalStorage} from "../../utils/localStorage"


const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/register", user);
      // console.log(resp);
      return resp.data; // normal durumda payload burası
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg); // hatada payload burası
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      // console.log(resp);
      return resp.data; // normal durumda payload burası
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg); // hatada payload burası
    }
  }
);

export const updateUser = createAsyncThunk( // burası sistemi bozuyor 
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/updateUser", user,{
        headers:{
          authorization:`Bearer ${thunkAPI.getState().user.user.token}`
        }
      });
      // console.log(resp);
      return resp.data; 
    } catch (error) {
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue(error.response.data.msg); 
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState:initialState,

  // REDUCERS
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
  
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },


  // EXTRA REDUCERS
  extraReducers: (builder) => { // bu sekilde yapınca warnning vermiyor
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload; // burdaki payload user bilgisi
        state.isLoading = false;
        // console.log(payload);
        state.user = user;
        addUserToLocalStorage(user)
        toast.success(`Hello there ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = true;
        toast.error(payload); // burdaki payload hata mesajı
      });
  },

  extraReducers: (builder) => { // bu sekilde yapınca warnning vermiyor
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload; // burdaki payload user bilgisi
        // console.log(user);
        state.isLoading = false;
        // console.log(payload);
        state.user = user;
        addUserToLocalStorage(user)
        toast.success(`Welcome Back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = true;
        toast.error(payload); // burdaki payload hata mesajı
      });
  },
  extraReducers: (builder) => { // bu sekilde yapınca warnning vermiyor
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload; // burdaki payload user bilgisi
        // console.log(user);
        state.isLoading = false;
        // console.log(payload);
        state.user = user;
        addUserToLocalStorage(user)
        toast.success(`Welcome Back ${user.name}`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = true;
        toast.error(payload); // burdaki payload hata mesajı
      });
  },



});

export const {toggleSidebar,logoutUser} = userSlice.actions

export default userSlice.reducer;


// Bu sekilde yapınca warning veriyor
/* extraReducers:{
    [registerUser.pending]: (state)=> {
        state.isLoading = true
    },
    [registerUser.fulfilled]: (state,{payload})=> {
        const {user} = payload // burdaki payload user bilgisi
        state.isLoading = false
        // console.log(payload);
        state.user = user
        toast.success(`Hello there ${user.name}`)
    },
    [registerUser.rejected]: (state,{payload})=> {
        state.isLoading = true
        toast.error(payload) // burdaki payload hata mesajı
    },

} */

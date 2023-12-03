import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllJobsThunk, showStatsThunk } from "./allJobsThunk";


const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk("allJobs/getJobs", getAllJobsThunk);
export const showStats = createAsyncThunk("allJobs/showStats", showStatsThunk);

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    /*
    showLoading ve hideLoading oluşturmamızın sebebi : 
      deleteJob ve editJob yaptıktan sonra getAllJob sı kullanarak yeni jobs ları almamız gerekiyor
       deleteJob veya editJob da işlemimiz boyunca loading devam edecek ve getAllJobs çalışınca da loading in sürmesi gerekiyor
       işte bunları jobThunk.js de kullanarak loading durumunu kontrol ediyoruz 
    
    */

    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
   
      handleChange: (state, { payload: { name, value } }) => {
        state.page = 1; 
        /* 
        Her handleChange deki bilgiler değiştiginde state.page = 1 yapmamız lazım
        çünkü bütün jobslar 75 adet diyelim ve 8 sayfamız var. 8. sayfaya tıkladıgımız da ve
        status u declined olarak sectıgımızde declined daki sayfa sayısı 3 ise veyaa 8 den kucuk 
        ise hata verecek. Page 1 e set ederek her filtereleme işleminde 1 sayfadan sergileyeceğiz
        */
        // console.log(name);
       state[name] = value;
     
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    // bir sonraki kullanıcı logout olan kullanıcını filtre seçeneklerini görmesin diye state i başlangıc degerlerine donduruyoruz
    clearAllJobsState: (state) => initialState
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        state.numOfPages = payload.numOfPages;
        state.totalJobs = payload.totalJobs;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions;

export default allJobsSlice.reducer;

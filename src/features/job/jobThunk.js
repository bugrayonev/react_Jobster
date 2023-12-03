import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
/*
    showLoading ve hideLoading oluşturmamızın sebebi : 
      deleteJob ve editJob yaptıktan sonra getAllJob sı kullanarak yeni jobs ları almamız gerekiyor
      deleteJob veya editJob da işlemimiz boyunca loading devam edecek ve getAllJobs çalışınca da loading in sürmesi gerekiyor
      işte bunları jobThunk.js de kullanarak loading durumunu kontrol ediyoruz 
    
    */

import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearValues } from "./jobSlice";

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", job);
    thunkAPI.dispatch(clearValues());
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
  import axios from 'axios';
  axios.defaults.baseURL = 'http://localhost:3000';

  export const createSurvey = createAsyncThunk(
    'survey/createSurvey',
    async (survey, { rejectWithValue }) => {
      try {
        const response = await axios.post('/surveys', survey);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );




  export const fetchSurvey = createAsyncThunk(
    'survey/fetchSurvey',
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/surveys/${id}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  
  export const updateSurvey = createAsyncThunk(
    'survey/updateSurvey',
    async (survey, { rejectWithValue }) => {

      try {
        const response = await axios.put(`/surveys/${survey.id}`, survey);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

  
  const surveySlice = createSlice({
    name: 'survey',
    initialState: {
      survey: {},
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createSurvey.fulfilled, (state, action) => {
          state.survey = action.payload;
        })
        .addCase(fetchSurvey.fulfilled, (state, action) => {
          state.survey = action.payload;
        })
        .addCase(updateSurvey.fulfilled, (state, action) => {
          state.survey = action.payload;
        });
        
    },
  });


  
  export default surveySlice.reducer;

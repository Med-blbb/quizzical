import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const res = await axios.get("https://opentdb.com/api_category.php");
    return res.data;
  }
);

const QuizSlice = createSlice({
  name: "quiz",
  initialState: {
    selectedCategory: "",
    difficulty: "",
    amount: "",
    questions: [],
    categories: [],
    loading: false, 
    error: null,
  },
  reducers: {
    changeCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    changeDifficulty: (state, action) => {
      state.difficulty = action.payload;
    },
    changeAmount: (state, action) => {
      state.amount = action.payload;
    },
    changeQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(getCategories.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { changeCategory, changeDifficulty, changeAmount, changeQuestions } =
  QuizSlice.actions;

export default QuizSlice.reducer;

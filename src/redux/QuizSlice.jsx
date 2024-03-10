import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const res = await axios.get("https://opentdb.com/api_category.php");
    return res.data;
  }
);
export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async ({ id, amount, difficulty }) => {
    const res = await axios.get(
      `https://opentdb.com/api.php?amount=${amount}&category=${id}&difficulty=${difficulty}`
    );
    const claimed = res.data.results;
    return claimed;
  }
);

const QuizSlice = createSlice({
  name: "quiz",
  initialState: {
    selectedCategory: "",
    difficulty: "",
    amount: "",
    theme: "dark",
    questions: [],
    categories: [],
    loading: true,
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
    changeLoading: (state, action) => {
      state.loading = action.payload;
    },
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
      state.loading = false;
    });
  },
});

export const {
  changeCategory,
  changeDifficulty,
  changeAmount,
  changeTheme,
  changeLoading,
  changeQuestions,
} = QuizSlice.actions;

export default QuizSlice.reducer;

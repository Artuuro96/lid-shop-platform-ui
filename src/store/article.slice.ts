// slices/articleSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../interfaces/article.interface';
import { InitialState } from '../interfaces/inital-state.interface';

const initialState: InitialState<Article[]> = {
  data: [],
  loading: false,
  error: null,
};

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    fetchArticlesStart(state) {
      state.loading = true;
    },
    fetchArticlesSuccess(state, action: PayloadAction<Article[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchArticlesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    postArticleStart(state) {
      state.loading = true;
    },
    postArticleSuccess(state, action: PayloadAction<Article>) {
      state.data.push(action.payload);
      state.loading = false;
    },
    postArticleFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteArticleStart(state) {
      state.loading = true;
    },
    deleteArticleSuccess(state, action: PayloadAction<Article>) {
      const filteredArticles = state.data.filter(article => article._id !== action.payload._id);
      state.data = filteredArticles;
      state.loading = false;
    },
    deleteArticleFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { 
  fetchArticlesStart, 
  fetchArticlesSuccess, 
  fetchArticlesFailure,
  postArticleFailure,
  postArticleStart,
  postArticleSuccess,
} = articleSlice.actions;

export const fetchArticles = () => ({
  type: 'api/call',
  payload: {
    url: 'http://localhost:8000/articles',
    method: 'GET',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDU0NWZiMi1iODhjLTQ1ZDMtYjBkOS1iMTgzZGNiOTBhNTciLCJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6InN5c3RlbSIsImxhc3ROYW1lIjoiYWNtYSIsInNlY29uZExhc3ROYW1lIjoidXNlciIsImVtYWlsIjoiYXJ0dXJvcm9kcjk2QGdtYWlsLmNvbSIsInJvbGVzIjpbXSwibW9kdWxlcyI6W10sImlhdCI6MTcxOTQ1Nzc3MiwiZXhwIjoxNzE5NDYxMzcyfQ.fRn1r-0OmhA5_9hYOGX_0cZVjF4colEERBe3WBUmym8',
    },
    onSuccess: fetchArticlesSuccess.type,
    onStart: fetchArticlesStart.type,
    onError: fetchArticlesFailure.type,
  },
});

export const postArticle = (article: Article) => ({
  type: 'api/call',
  payload: {
    url: 'http://localhost:8000/articles',
    method: 'POST',
    data: article,
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDU0NWZiMi1iODhjLTQ1ZDMtYjBkOS1iMTgzZGNiOTBhNTciLCJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6InN5c3RlbSIsImxhc3ROYW1lIjoiYWNtYSIsInNlY29uZExhc3ROYW1lIjoidXNlciIsImVtYWlsIjoiYXJ0dXJvcm9kcjk2QGdtYWlsLmNvbSIsInJvbGVzIjpbXSwibW9kdWxlcyI6W10sImlhdCI6MTcxOTQ1Nzc3MiwiZXhwIjoxNzE5NDYxMzcyfQ.fRn1r-0OmhA5_9hYOGX_0cZVjF4colEERBe3WBUmym8',
    },
    onSuccess: postArticleSuccess.type,
    onStart: postArticleStart.type,
    onError: postArticleFailure.type,
  },
});

export const deleteArticleById = (articleId: string | undefined) => ({
  type: 'api/call',
  payload: {
    url: `http://localhost:8000/articles/${articleId}`,
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDU0NWZiMi1iODhjLTQ1ZDMtYjBkOS1iMTgzZGNiOTBhNTciLCJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6InN5c3RlbSIsImxhc3ROYW1lIjoiYWNtYSIsInNlY29uZExhc3ROYW1lIjoidXNlciIsImVtYWlsIjoiYXJ0dXJvcm9kcjk2QGdtYWlsLmNvbSIsInJvbGVzIjpbXSwibW9kdWxlcyI6W10sImlhdCI6MTcxOTQ1Nzc3MiwiZXhwIjoxNzE5NDYxMzcyfQ.fRn1r-0OmhA5_9hYOGX_0cZVjF4colEERBe3WBUmym8',
    },
    onSuccess: postArticleSuccess.type,
    onStart: postArticleStart.type,
    onError: postArticleFailure.type,
  },
});

export default articleSlice.reducer;

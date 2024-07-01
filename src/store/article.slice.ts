import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, DeletedArticleIds } from '../interfaces/article.interface';
import { InitialState } from '../interfaces/inital-state.interface';
import { token } from '../utils/token';

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
    deleteArticleSuccess(state, action: PayloadAction<DeletedArticleIds>) {
      const filteredArticles = state.data.filter(article => !action.payload.deletedIds.includes(article._id));
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
  deleteArticleFailure,
  deleteArticleStart,
  deleteArticleSuccess,
} = articleSlice.actions;

export const fetchArticles = () => ({
  type: 'api/call',
  payload: {
    url: 'http://localhost:8000/articles',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
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
      Authorization: 'Bearer ' + token,
    },
    onSuccess: postArticleSuccess.type,
    onStart: postArticleStart.type,
    onError: postArticleFailure.type,
  },
});

export const deleteArticlesById = (articleIds: string[] | undefined) => ({
  type: 'api/call',
  payload: {
    url: `http://localhost:8000/articles/?article_ids=${articleIds?.join('&article_ids=')}`,
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    onSuccess: deleteArticleSuccess.type,
    onStart: deleteArticleStart.type,
    onError: deleteArticleFailure.type,
  },
});

export default articleSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProductService from './ProductService';

const initialState = {
  products: [],
  status: 'idle',
};

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  return await ProductService.getAll();
});

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productSlice.reducer;

import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './api/api'
import cartSlice from './features/cartSlice'


const store = configureStore({
    reducer:{
    [baseApi.reducerPath]: baseApi.reducer,
    cart: cartSlice
    },
    middleware:(getDefaultMiddlewares)=> getDefaultMiddlewares().concat(baseApi.middleware)
})

export default store
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch
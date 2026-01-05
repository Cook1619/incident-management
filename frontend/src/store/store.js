import { configureStore } from '@reduxjs/toolkit'
import incidentsReducer from './slices/incidentsSlice'

export const store = configureStore({
  reducer: {
    incidents: incidentsReducer,
  },
})

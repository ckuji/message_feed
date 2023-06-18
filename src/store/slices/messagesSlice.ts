import { createSlice, current } from '@reduxjs/toolkit';
import { IMessageExtended } from '../../types';

export interface MessagesState {
  messages: IMessageExtended[] | [],
  sortInOrder: boolean
}

const initialState: MessagesState = {
    messages: [],
    sortInOrder: true
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, {payload}) => {
      state.messages = payload
    },
    setMessageFavorites: (state, {payload}) => {
      let items = [...state.messages]
      state.messages = items.map((unit) => {
        if(unit.uniqueId === payload) {
          return {...unit, active: !unit.active}
        }
        return unit
      })
    },
    clearMessages: (state) => {
      state.messages = initialState.messages
    },
    setSortInOrder: (state) => {
      state.sortInOrder = !state.sortInOrder
    }
  }
})

export const { 
    addMessages,
    setMessageFavorites,
    clearMessages,
    setSortInOrder
} = messagesSlice.actions

export default messagesSlice.reducer
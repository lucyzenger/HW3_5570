import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BabyLog = {
  id: string;
  date: string;
  note: string;
};

type BabyState = {
  logs: BabyLog[];
};

const initialState: BabyState = {
  logs: [],
};

const babySlice = createSlice({
  name: 'baby',
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<{ date: string; note: string }>) => {
      const newLog: BabyLog = {
        id: Date.now().toString(),
        date: action.payload.date,
        note: action.payload.note,
      };
      state.logs.push(newLog);
    },
  },
});

export const { addLog } = babySlice.actions;
export default babySlice.reducer;

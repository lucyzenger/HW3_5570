import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type BabyLog = {
  id: string;
  date: string;
  note: string;
  created_at?: string;
};

type BabyState = {
  logs: BabyLog[];
  loading: boolean;
  error: string | null;
};

const initialState: BabyState = {
  logs: [],
  loading: false,
  error: null,
};

const API_URL = 'https://essay-diving-seek-hampton.trycloudflare.com/api/logs/';
// GET /api/logs/
export const fetchLogs = createAsyncThunk<BabyLog[]>(
  'baby/fetchLogs',
  async () => {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error('Failed to fetch logs');
    }
    const data = await res.json();
    return data as BabyLog[];
  }
);

// POST /api/logs/
export const createLog = createAsyncThunk<
  BabyLog,
  { date: string; note: string }
>('baby/createLog', async (payload) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error('Failed to create log');
  }
  const data = await res.json();
  return data as BabyLog;
});

const babySlice = createSlice({
  name: 'baby',
  initialState,
  reducers: {
    // keep local addLog just in case, but not required now
    addLog: (state, action: PayloadAction<{ date: string; note: string }>) => {
      const newLog: BabyLog = {
        id: Date.now().toString(),
        date: action.payload.date,
        note: action.payload.note,
      };
      state.logs.push(newLog);
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchLogs
      .addCase(fetchLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error loading logs';
      })
      // createLog
      .addCase(createLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLog.fulfilled, (state, action) => {
        state.loading = false;
        state.logs.unshift(action.payload);
      })
      .addCase(createLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error creating log';
      });
  },
});

export const { addLog } = babySlice.actions;
export default babySlice.reducer;
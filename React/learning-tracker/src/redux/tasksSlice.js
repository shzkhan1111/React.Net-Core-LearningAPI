import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, createTask , taskCompleted} from '../services/api';

// Async thunk for fetching tasks
export const getTasks = createAsyncThunk('tasks/getTasks', async () => {
    const tasks = await fetchTasks();
    return tasks;
  });

  export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
    const newTask = await createTask(task);
    return newTask; 
  });
  export const completeTask = createAsyncThunk(
    "tasks/completeTask",
    async (id) => {
        const updatedTask = await taskCompleted(id);
        return updatedTask;
    }
);
  const tasksSlice = createSlice({
    name : 'tasks',
    initialState : {
        items : [],
        status : 'idle',
        error : null
    },
    reducers : {},
    extraReducers:(builder) => {
        builder
        .addCase(getTasks.pending , (state) => {
            state.status = 'loading';
        })
        .addCase(getTasks.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
          })
          .addCase(getTasks.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(addTask.fulfilled, (state, action) => {
            state.items.push(action.payload);
          })
          .addCase(completeTask.fulfilled , (state , action) => {
             // eslint-disable-next-line no-debugger
            debugger;
            const task = state.items.find( (t) => t.id === action.payload.id);
            console.log(state.items)
            if(task){
                task.isCompleted = true;
            }
          })
          ;
    }
  })

  export default tasksSlice.reducer;

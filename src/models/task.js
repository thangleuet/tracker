import * as taskServices from '../services/task';

const TaskModel = {
  namespace: 'task',
  state: {
    taskList: [],
    taskDetail: {},
    createTaskData: {},
  },
  effects: {
    *getListTask(_, { call, put }) {
      const res = yield call(taskServices.getTask);

      if(res.success) {
        yield put({
          type: 'save',
          payload: res.data,
        })
      }
    },
    *getDetailTask({ payload }, { call, put }) {
      const res = yield call(taskServices.getTaskDetail, payload);

      if(res.success) {
        yield put({
          type: 'saveDetail',
          payload: res.data,
        })
      }
    },
    *createTask({ payload }, { call, put }) {
      const res = yield call(taskServices.createTask, payload);

      if(res.success) {
        yield put({
          type: 'saveCreateData',
          payload: res.data,
        })
      }
    }
  },
  reducers: {
    save: (state, action) => {
      return { ...state, taskList: action.payload };
    },
    saveDetail: (state, action) => {
      return { ...state, taskDetail: action.payload };
    },
    saveCreateData: (state, action) => {
      return { ...state, createTaskData: action.payload };
    }
  }
};

export default TaskModel;

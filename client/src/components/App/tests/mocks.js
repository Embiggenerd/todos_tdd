export const authedTodosListMockState = {
  loading: false,
  auth: true,
  todos: [
    {
      todo: 'invent cure',
      closed: true
    },
    {
      todo: 'implement cure',
      closed: false
    }
  ]
};

export const authedEmptyTodosListMockState = {
  loading: false,
  auth: true,
  todos: []
};

export const unauthedTodosListMockState = {
  loading: false,
  auth: false,
  todos: [
    {
      todo: 'invent cure',
      closed: true
    },
    {
      todo: 'implement cure',
      closed: false
    }
  ]
};

export const unauthedSignupFormMockState = {
  loading: false,
  auth: false,
  userFormDisplay: 'signup'
};

export const unauthedLoginFormMockState = {
  loading: false,
  auth: false,
  userFormDisplay: 'login'
};

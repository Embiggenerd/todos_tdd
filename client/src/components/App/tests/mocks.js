export const authedTodosListMockState = {
  loading: false,
  auth: true,
  todos: [
    {
      todo: 'invent cure',
      closed: true,
      _id: 123
    },
    {
      todo: 'implement cure',
      closed: false,
      id: 124
    }
  ],
  username: 'Carlos McGregor'
};

export const authedEmptyTodosListMockState = {
  loading: false,
  auth: true,
  todos: []
};
export const unauthedMockState = {
  loading: false,
  auth: false
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

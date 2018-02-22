import authReducer from '../../reducers/auth';

test('should login', () => {
  const action = {
      type: 'LOGIN',
      uid: '123abc'
  };
 const state = authReducer(undefined, action);
 expect(state.uid).toBe('123abc');
});

test('should logout', () => {
  const action = { type: 'LOGOUT' };
  const state = authReducer({uid: 'any'}, action);
  expect(state.uid).toBeFalsy();
});
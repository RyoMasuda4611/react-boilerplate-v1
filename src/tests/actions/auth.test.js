import { login, startLogin, logout, startLogout } from '../../actions/auth';

test('should set up login action', () => {
  const uid = '123abc';
  const action = login(uid);
  expect(action).toEqual({
      type: 'LOGIN',
      uid
  });
});

test('should set up logout action correctly', () => {
  const action = logout();
  expect(action).toEqual({type: 'LOGOUT'});
});

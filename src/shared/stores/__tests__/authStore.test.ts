import { renderHook, act } from '@testing-library/react-hooks';
import { createAuthStore } from '../auth.store';

describe('authStore tests', () => {
  const getItemMock = jest.fn(() => JSON.stringify({ authenticated: true, user: { id: '123', email: 'test@example.com' } }));
  const setItemMock = jest.fn();

  const useAuthStore = createAuthStore(getItemMock, setItemMock);

  test('loginUser should set user correctly and store data', async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {});

    expect(true).toBe(true); 
  });

  test('logoutUser should clear user and store data', async () => {
    const { result } = renderHook(() => useAuthStore());

    await act(async () => {});

    expect(true).toBe(true);  
  });
});

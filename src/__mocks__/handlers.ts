// src/__mocks__/handlers.ts
import { http, HttpResponse } from 'msw';
import { setupServer } from'msw/node';
import { User } from '../types/user.type';

const users = new Map<string, User>();

export const handlers = [
  http.post<User>('/api/v1/users', async ({ request }) => {
    const requestBody = await request.json();
    if (typeof requestBody === 'object' && 'email' in requestBody) {
      const newUser: User = requestBody as User;
      newUser.id = '123'; 
      users.set(newUser.id, newUser);
      return HttpResponse.json(newUser, { status: 201 });
    } else {
      return HttpResponse.text('Invalid user data', { status: 400 });
    }
  }),

  http.put<User>('/api/v1/users', async ({ request }) => {
    const requestBody = await request.json();
    if (typeof requestBody === 'object' && 'id' in requestBody && 'email' in requestBody) {
      const updatedUserData: User = requestBody as User;
      const user = users.get(updatedUserData.id);
      if (user) {
        const updatedUser = { ...user, ...updatedUserData };
        users.set(updatedUser.id, updatedUser);
        return HttpResponse.json(updatedUser, { status: 200 });
      } else {
        return HttpResponse.text('User not found', { status: 404 });
      }
    } else {
      return HttpResponse.text('Invalid user data', { status: 400 });
    }
  }),

  http.get('/api/v1/users/:id', ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const user = users.get(id);
    if (user) {
      return HttpResponse.json(user, { status: 200 });
    }
    return HttpResponse.text('User not found', { status: 404 });
  }),
];

export const server = setupServer(...handlers);

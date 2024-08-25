// src/__mocks__/setupTests.ts
import '@testing-library/jest-dom';
import { server } from './handlers'; 

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

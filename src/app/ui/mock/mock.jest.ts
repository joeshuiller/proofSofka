import { jest } from '@jest/globals';
export const mockProductRepository = {
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

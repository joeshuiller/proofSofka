export default {
  preset: 'jest-preset-angular',
  moduleDirectories: ['node_modules', '<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],

  // 🚨 Tratamos el código como ESM
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^rxjs$': '<rootDir>/node_modules/rxjs/dist/bundles/rxjs.umd.js',
    '^rxjs/operators$': '<rootDir>/node_modules/rxjs/dist/bundles/rxjs.umd.js',
    '^src/(.*)$': '<rootDir>/src/$1',
    // Si usas uuid, este mapeo evita el error de export
    '^uuid$': 'uuid',
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$|@angular|@rxjs|rxjs|sweetalert2|uuid)'
  ],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
        useESM: true, // 👈 Clave para Angular 21
      },
    ],
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
  ],
};

module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/styles/**/*',
    '!<rootDir>/src/pages/_*.tsx',
    '!<rootDir>/src/pages/index.tsx',
    '!<rootDir>/src/pages/settings.tsx',
    '!<rootDir>/src/presentation/components/router/**/*',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
}

/* eslint-disable functional/immutable-data */
module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['src'],
  // testRegex: '.spec.ts$',
  coverageDirectory: '../coverage',
  moduleDirectories: ['node_modules', 'src', __dirname],
  modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/docs'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  clearMocks: true,
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  setupFilesAfterEnv: ['jest-extended/all'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.entity.ts',
    '!**/*.dto.ts',
    '!**/*.module.ts',
  ],
}

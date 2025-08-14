module.exports = {
    // Test environment
    testEnvironment: 'jsdom',

    // Roots and test patterns
    roots: ['<rootDir>/src'],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'
    ],

    // Coverage configuration
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.stories.{js,jsx,ts,tsx}',
        '!src/**/index.{js,jsx,ts,tsx}'
    ],

    // Setup files
    setupFiles: ['react-app-polyfill/jsdom'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

    // Transformers
    transform: {
        '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/config/jest/babelTransform.js',
        '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
        '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
    },

    // Module resolution
    modulePaths: ['<rootDir>/src'],
    moduleNameMapper: {
        '^react-native$': 'react-native-web',
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
        '^@Components/(.*)$': '<rootDir>/src/Components/$1',
        '^@Pages/(.*)$': '<rootDir>/src/Pages/$1',
        '^@Hooks/(.*)$': '<rootDir>/src/Hooks/$1',
        '^@Types$': '<rootDir>/src/types'
    },

    // File extensions
    moduleFileExtensions: [
        'web.js',
        'js',
        'web.ts',
        'ts',
        'web.tsx',
        'tsx',
        'json',
        'web.jsx',
        'jsx',
        'node'
    ],

    // Transform ignore patterns
    transformIgnorePatterns: [
        'node_modules/(?!(react-markdown|remark-gfm|rehype-highlight|@testing-library)/)'
    ],

    // Watch plugins
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname'
    ],

    // Jest configuration
    resetMocks: true,

    // TypeScript support
    preset: undefined, // Disable any preset to use our custom config

    // Clear mocks between tests
    clearMocks: true,

    // Test timeout
    testTimeout: 10000,

    // Verbose output for debugging
    verbose: true,

    // Collect coverage
    collectCoverage: false,

    // Coverage directory
    coverageDirectory: 'coverage',

    // Coverage reporters
    coverageReporters: ['text', 'lcov', 'html'],

    // Coverage thresholds (optional)
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    }
};

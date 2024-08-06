module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    testEnvironment: 'jsdom',
    // Puedes ajustar esto si tu estructura es diferente
    roots: ['<rootDir>/src'],
};

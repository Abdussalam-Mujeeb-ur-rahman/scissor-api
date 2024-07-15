import extractUser from '../../src/utils/extractUser';

describe('extractUser', () => {
    it('should return the user object when the random string is found in the cache', () => {
        const mockCache = {
            take: jest.fn((id) => {
                if (id === "valid-id") {
                    return Buffer.from(JSON.stringify({ name: "Allahisrabb", age: 20 })).toString('base64');
                }

                return null;
            })
        }

        const user = extractUser("valid-id", mockCache);

        expect(user).toBeInstanceOf(Object);
        expect(user).toEqual({ name: "Allahisrabb", age: 20 });
        expect(mockCache.take).toHaveBeenCalledWith("valid-id");
    });

    it('should return null when the random string is not found in the cache', () => {
        const mockCache = {
            take: jest.fn(() => null),
        }

        const user = extractUser("invalid-id", mockCache);

        expect(user).toBeNull();
        expect(mockCache.take).toHaveBeenCalledWith("invalid-id");
    });

    it('should throw error when the random string is not a valid JSON string', () => {
        const mockCache = {
            take: jest.fn(() => Buffer.from('not a JSON string').toString('base64')),
        };

        expect(() => {
            extractUser('invalid-json', mockCache);
          }).toThrow(SyntaxError);
    })
})
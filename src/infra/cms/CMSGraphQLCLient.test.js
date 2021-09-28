/* eslint-disable no-unused-vars */
import { GraphQLClient } from 'graphql-request';
import { CMSGraphQLClient } from './CMSGraphQLClient';

afterEach(() => {
  GraphQLClient.mockClear();
});

// from https://jestjs.io/docs/es6-class-mocks#spying-on-methods-of-our-class
const mockRequest = jest.fn((query, variables) => 'payload');
jest.mock('graphql-request', () => {
  // Works and lets you check for constructor calls:
  return {
    GraphQLClient: jest.fn().mockImplementation(() => {
      return { constructor: () => {}, request: mockRequest };
    }),
  };
});

describe('GraphQLClient', () => {
  describe('DatoCMS Token', () => {
    test('loads token properly', () => {
      expect(process.env.DATO_READONLY_TOKEN).toBe('private readonly dato cms token');
    });
  });

  describe('CMS Url', () => {
    describe('creates GraphQLClient', () => {
      test('with preview', async () => {
        CMSGraphQLClient({ preview: true }, GraphQLClient);
        expect(GraphQLClient).toHaveBeenCalledTimes(1);
        expect(GraphQLClient)
          .toHaveBeenLastCalledWith('https://graphql.datocms.com/preview',
            {
              headers: {
                Authorization: `Bearer ${process.env.DATO_READONLY_TOKEN}`,
              },
            });
      });

      test('without preview', async () => {
        CMSGraphQLClient({ preview: false }, GraphQLClient);
        expect(GraphQLClient).toHaveBeenCalledTimes(1);
        expect(GraphQLClient)
          .toHaveBeenLastCalledWith('https://graphql.datocms.com/',
            {
              headers: {
                Authorization: `Bearer ${process.env.DATO_READONLY_TOKEN}`,
              },
            });
      });
    });
  });

  describe('query()', () => {
    const client = CMSGraphQLClient({ preview: false }, GraphQLClient);

    const query = '';
    const variables = [];

    test('returns expected response object', async () => {
      const response = await client.query({ query, variables });

      // aceita qualquer payload desde que seja diferente de undefined ou null
      expect(response).toEqual(expect.objectContaining({ data: { messages: expect.anything() } }));
    });
  });
});

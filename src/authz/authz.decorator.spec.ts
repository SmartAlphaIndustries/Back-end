import { JSONSchema } from './authz.decorator';

describe('JSONSchema', () => {
  test('It should throw error if the schema is not valid for Swagger', () => {
    let error = false;
    try {
      JSONSchema(null);
    } catch (err) {
      error = true;
    }
    expect(error).toBe(true);
  });
});

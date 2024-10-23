import { MongoAdapter } from './mongo.adapter';

describe('MongoAdapter', () => {
  it('should be defined', () => {
    expect(new MongoAdapter()).toBeDefined();
  });
});

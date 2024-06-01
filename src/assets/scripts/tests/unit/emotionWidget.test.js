import { getEmotion } from '../../../emotion-widget/emotion-widget';

// Describe the test suite
describe('getEmotion', () => {
  // Write the test case
  it('should return MEH by default', () => {
    // Call the function and store the result
    const result = getEmotion();
    // Assert that the result is 'MEH'
    expect(result).toBe('MEH');
  });
});
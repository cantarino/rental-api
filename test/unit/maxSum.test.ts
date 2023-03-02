import { getMaxSum } from "../../src/app/maxSum/data";

describe("Max Sum", () => {
  test("Should get only the first element", async () => {
    const list = [-1, -1, -1, -1, -1];
    const expectedResponse = { sum: -1, positions: [1] };
    const response = getMaxSum(list);
    expect(response).toEqual(expectedResponse);
  });

  test("Should get only the second element", async () => {
    const list = [-200, -1, -1, -1, -1000];
    const expectedResponse = { sum: -1, positions: [2] };
    const response = getMaxSum(list);
    expect(response).toEqual(expectedResponse);
  });

  test("Should get all elements but the first and last", async () => {
    const list = [-321, 2, -1, 2, -123];
    const expectedResponse = { sum: 3, positions: [2, 3, 4] };
    const response = getMaxSum(list);
    expect(response).toEqual(expectedResponse);
  });

  test("Should get all elements but the first", async () => {
    const list = [-321, 1, 2, 3, 4];
    const expectedResponse = { sum: 10, positions: [2, 3, 4, 5] };
    const response = getMaxSum(list);
    expect(response).toEqual(expectedResponse);
  });

  test("Should get all elements", async () => {
    const list = [1, 2, 3, 4, 5];
    const expectedResponse = { sum: 15, positions: [1, 2, 3, 4, 5] };
    const response = getMaxSum(list);
    expect(response).toEqual(expectedResponse);
  });

  test("Should get all elements but the last", async () => {
    const list = [1, 2, 3, 4, -456];
    const expectedResponse = { sum: 10, positions: [1, 2, 3, 4] };
    const response = getMaxSum(list);
    expect(response).toEqual(expectedResponse);
  });

  test("Should get only the third element", async () => {
    const list = [-1, -1, 200, -1, -1];
    const expectedResponse = { sum: 200, positions: [3] };
    const response = getMaxSum(list);
    expect(response).toEqual(expectedResponse);
  });

  test("Should get the only element", async () => {
    const list = [-1];
    const expectedResponse = { sum: -1, positions: [1] };
    const response = getMaxSum(list);
    expect(response).toEqual(expectedResponse);
  });

  test("Should get elements 4, -1, 2, 1", async () => {
    const list = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
    const expectedResponse = { sum: 6, positions: [4, 5, 6, 7] };
    const response = getMaxSum(list);
    expect(response).toEqual(expectedResponse);
  });
});

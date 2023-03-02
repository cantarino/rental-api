import request from "supertest";
import { buildApp } from "../../src/app/app";

const MAX_SUM_MUTATION = `
    mutation MaxSumMutation($list: [Float!]!){
        maxsum(list: $list) {
            sum
            positions
        }
    }`;

describe("Max Sum Resolver", () => {
  test("Should run max sum mutation request", async () => {
    const list = [-2, 3, 5, -1, 4, -5];
    const expectedResponse = { sum: 11, positions: [2, 3, 4, 5] };

    const app = await buildApp();
    await request(app)
      .post("/graphql")
      .send({
        query: MAX_SUM_MUTATION,
        variables: {
          list,
        },
      })
      .set("Accept", "application/json")
      .expect(200)
      .then((res) => {
        const maxSumResponse = res.body?.data?.maxsum;
        expect(maxSumResponse).toEqual(expectedResponse);
      });
  });
});

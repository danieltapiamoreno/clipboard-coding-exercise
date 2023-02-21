const { deterministicPartitionKey } = require("./dpk");

const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  describe("Given no event", () => {
    it("Returns the literal '0' when given no input", () => {
      const trivialKey = deterministicPartitionKey();
      expect(trivialKey).toBe("0");
    });
  });

  describe("Given event object without partitionKey", () => {
    it("Returns string hashed with 128 length when given empty object as event", () => {
      const trivialKey = deterministicPartitionKey({});
      expect(typeof trivialKey).toBe("string");
      expect(trivialKey.length).toBe(128);
    });
  });

  describe("Given event object with partitionKey", () => {
    it("Returns partitionKey when given short string partitionKey in event", () => {
      const partitionKey = "partitionKey";
      const trivialKey = deterministicPartitionKey({ partitionKey });
      expect(trivialKey).toBe(partitionKey);
    });

    it("Returns string hashed with 128 length when given long string as partitionKey", () => {
      const partitionKey = crypto.randomBytes(256).toString("hex");

      const trivialKey = deterministicPartitionKey({ partitionKey });
      expect(typeof trivialKey).toBe("string");
      expect(trivialKey.length).toBe(128);
    });

    it("Returns stringify partitionKey when given boolean as partitionKey", () => {
      const partitionKey = true;
      const trivialKey = deterministicPartitionKey({ partitionKey });
      expect(trivialKey).toBe(JSON.stringify(partitionKey));
    });

    it("Returns stringify partitionKey when given number as partitionKey", () => {
      const partitionKey = 1;
      const trivialKey = deterministicPartitionKey({ partitionKey });
      expect(trivialKey).toBe(JSON.stringify(partitionKey));
    });
    it("Returns stringify partitionKey when given object as partitionKey", () => {
      const partitionKey = { test: "value" };
      const trivialKey = deterministicPartitionKey({ partitionKey });
      expect(trivialKey).toBe(JSON.stringify(partitionKey));
    });
  });
});

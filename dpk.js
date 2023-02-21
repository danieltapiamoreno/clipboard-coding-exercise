const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const verifyCandidateTypeAndLength = (candidate) => {
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};

exports.deterministicPartitionKey = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY;

  let candidate;
  const data = JSON.stringify(event);

  candidate = !event.partitionKey
    ? crypto.createHash("sha3-512").update(data).digest("hex")
    : event.partitionKey;

  return verifyCandidateTypeAndLength(candidate);
};

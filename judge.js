// judge1099.js
async function evaluatePayload(payload, policyEngine) {
  if (!payload) {
    throw new Error('Payload is required');
  }

  const score = await policyEngine.scorePayload(payload);
  const threshold = policyEngine.threshold ?? 0;
  const isEligible = score >= threshold;

  const reasons = policyEngine.determineReasons(payload, score);
  return { isEligible, score, reasons };
}

async function evaluate1099(payload, policyEngine) {
  return evaluatePayload(payload, policyEngine);
}

module.exports = { evaluate1099 };

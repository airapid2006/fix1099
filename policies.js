// policies.js
function defaultScore(payload) {
  let score = 0;
  if (payload?.income != null && typeof payload.income === 'number') score += Math.min(50, payload.income / 1000);
  if (payload?.complianceHistory === 'clean') score += 40;
  if (payload?.hasPrior1099 === true) score += 10;
  return Math.max(0, Math.min(100, score));
}

function defaultReasons(payload, score) {
  const reasons = [];
  if (payload?.income == null) reasons.push('income missing');
  if (score < 30) reasons.push('low score');
  if (payload?.complianceHistory !== 'clean') reasons.push('compliance history not clean');
  return reasons.length ? reasons : ['score good'];
}

function createPolicyEngine(options) {
  const engine = {
    threshold: (options && options.threshold) ?? 60,
    scorePayload: defaultScore,
    determineReasons: defaultReasons,
  };
  engine.addPolicy = function() {
    // 占位：未来扩展
  };
  return engine;
}

function getPolicyEngine() {
  if (global.__POLICY_ENGINE__) {
    return global.__POLICY_ENGINE__;
  }
  const eng = createPolicyEngine({ threshold: 60 });
  global.__POLICY_ENGINE__ = eng;
  return eng;
}

module.exports = { getPolicyEngine };


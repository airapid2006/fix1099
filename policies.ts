import { Router } from "express";

const router = Router();

router.get("/policies", (req, res) => {
  const type = String(req.query.type || "all");

  const payload = {
    disclaimers: {
      "disclaimer.default":
        "This service files information returns (1099). It does not provide personal tax filing, refunds, or tax advice.",
      "disclaimer.information_return":
        "This is an information return filing service. We don’t provide tax advice.",
      "disclaimer.platform_1099k":
        "For platform/third-party payments, reporting may be handled by the platform (e.g., 1099-K). We’ll guide you without requiring you to choose forms or boxes.",
      "disclaimer.low_confidence":
        "We’ll still guide you. Upload/collect recipient info and we’ll auto-match the correct filing path—no forms or boxes to choose.",
    },
    payment_policy: {
      title: "Payment Policy",
      body:
        "Payments are processed securely at checkout. Charges follow the plan shown on the pricing page. After payment, we begin the filing workflow and generate your filing outputs (recipient copy and filing receipt).",
    },
    refund_policy: {
      title: "Refund Policy",
      body:
        "If a filing has already been generated or submitted, the service is considered delivered and fees are non-refundable. If we cannot complete the workflow due to a verified system issue before submission, we will provide a remedy and may offer a refund where applicable.",
    },
  };

  if (type === "disclaimers") return res.json({ disclaimers: payload.disclaimers });
  if (type === "payment") return res.json({ payment_policy: payload.payment_policy });
  if (type === "refund") return res.json({ refund_policy: payload.refund_policy });

  return res.json(payload);
});

export default router;

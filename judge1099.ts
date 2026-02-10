import { Router } from "express";

type PayeeType = "individual" | "company" | "platform";
type Reason = "service" | "rent" | "award" | "other";
type PaymentMethod = "bank" | "check" | "third_party";

type Confidence = "high" | "medium" | "low";
type FormType = "1099-NEC" | "1099-MISC" | "none";

type JudgeInput = {
  payee_type: PayeeType;
  reason: Reason;
  payment_method: PaymentMethod;
};

type JudgeOutput = {
  need_1099: boolean;
  form_type: FormType;
  box: string;
  confidence: Confidence;
  required_next_docs: string[];
  disclaimer_key: string;
};

function judge1099(input: JudgeInput): JudgeOutput {
  const base: JudgeOutput = {
    need_1099: false,
    form_type: "none",
    box: "Box 1",
    confidence: "low",
    required_next_docs: [],
    disclaimer_key: "disclaimer.default",
  };

  // Priority 1: platform or third_party method => we don't generate 1099
  if (input.payee_type === "platform" || input.payment_method === "third_party") {
    return {
      ...base,
      need_1099: false,
      form_type: "none",
      box: "N/A",
      confidence: "high",
      required_next_docs: ["recipient_identity_basic"],
      disclaimer_key: "disclaimer.platform_1099k",
    };
  }

  // Priority 2: reason mapping
  if (input.reason === "rent") {
    return {
      ...base,
      need_1099: true,
      form_type: "1099-MISC",
      box: "Box 1",
      confidence: "high",
      required_next_docs: ["w9_or_tax_id", "recipient_name", "recipient_address"],
      disclaimer_key: "disclaimer.information_return",
    };
  }

  if (input.reason === "service") {
    return {
      ...base,
      need_1099: true,
      form_type: "1099-NEC",
      box: "Box 1",
      confidence: "high",
      required_next_docs: ["w9_or_tax_id", "recipient_name", "recipient_address"],
      disclaimer_key: "disclaimer.information_return",
    };
  }

  if (input.reason === "award") {
    return {
      ...base,
      need_1099: true,
      form_type: "1099-MISC",
      box: "Box 3",
      confidence: "medium",
      required_next_docs: ["w9_or_tax_id", "recipient_name", "recipient_address"],
      disclaimer_key: "disclaimer.information_return",
    };
  }

  // other => safe default: NEC Box 1, low confidence
  return {
    ...base,
    need_1099: true,
    form_type: "1099-NEC",
    box: "Box 1",
    confidence: "low",
    required_next_docs: ["w9_or_tax_id", "recipient_name", "recipient_address"],
    disclaimer_key: "disclaimer.low_confidence",
  };
}

function isPayeeType(v: any): v is PayeeType {
  return v === "individual" || v === "company" || v === "platform";
}
function isReason(v: any): v is Reason {
  return v === "service" || v === "rent" || v === "award" || v === "other";
}
function isPaymentMethod(v: any): v is PaymentMethod {
  return v === "bank" || v === "check" || v === "third_party";
}

const router = Router();

router.post("/judge", (req, res) => {
  const { payee_type, reason, payment_method } = req.body || {};

  if (!isPayeeType(payee_type) || !isReason(reason) || !isPaymentMethod(payment_method)) {
    return res.status(400).json({
      error: "invalid_input",
      message: "Invalid inputs. Provide payee_type, reason, payment_method.",
    });
  }

  const out = judge1099({ payee_type, reason, payment_method });
  return res.json(out);
});

export default router;

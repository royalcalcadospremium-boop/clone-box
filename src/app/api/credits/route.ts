import { NextRequest, NextResponse } from "next/server";
import { getBalance, getDemoUserId, CREDIT_COSTS } from "@/lib/credits";

export async function GET(req: NextRequest) {
  const userId = getDemoUserId(req);
  const balance = getBalance(userId);

  return NextResponse.json({
    balance,
    userId,
    costs: CREDIT_COSTS,
    plans: [
      { name: "Starter", price: 15, credits: 200, pricePerCredit: 0.075 },
      { name: "Plus", price: 39, credits: 1000, pricePerCredit: 0.039 },
      { name: "Ultra", price: 99, credits: 3000, pricePerCredit: 0.033 },
    ],
  });
}

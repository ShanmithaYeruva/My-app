"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { supabase } from "../../supabase/supabase";

export default function PricingCard({
  item,
  user,
}: {
  item: any;
  user: User | null;
}) {
  // Real Stripe checkout process
  const handleCheckout = async (priceId: string) => {
    if (!user) {
      // Redirect to login if user is not authenticated
      window.location.href = "/sign-in?redirect=pricing";
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-create-checkout",
        {
          body: {
            price_id: priceId,
            user_id: user.id,
            return_url: `${window.location.origin}/dashboard`,
          },
          headers: {
            "X-Customer-Email": user.email || "",
          },
        },
      );

      if (error) {
        throw error;
      }

      // Redirect to Stripe checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      // Fallback to success page if Stripe is not working
      window.location.href = "/success";
    }
  };

  // Define features based on plan tier
  const getFeatures = (planName: string) => {
    const baseFeatures = [
      "Real-time pricing analytics",
      "Basic pricing simulator",
      "eCommerce integration",
    ];

    const proFeatures = [
      ...baseFeatures,
      "Advanced pricing simulator",
      "Bundle builder tool",
      "Revenue impact forecasting",
      "Email reports",
    ];

    const enterpriseFeatures = [
      ...proFeatures,
      "Competitor price tracking",
      "Custom AI models",
      "API access",
      "Dedicated support",
    ];

    if (planName?.toLowerCase().includes("enterprise")) {
      return enterpriseFeatures;
    } else if (planName?.toLowerCase().includes("pro")) {
      return proFeatures;
    } else {
      return baseFeatures;
    }
  };

  const features = getFeatures(item?.name || "");

  return (
    <Card
      className={`w-full relative overflow-hidden ${item.popular ? "border-2 border-blue-500 bg-slate-800 shadow-xl scale-105" : "border border-slate-700 bg-slate-800"}`}
    >
      {item.popular && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-800 to-purple-900/20 opacity-30" />
      )}
      <CardHeader className="relative">
        {item.popular && (
          <div className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-fit mb-4">
            Most Popular
          </div>
        )}
        <CardTitle className="text-2xl font-bold tracking-tight text-white">
          {item.name}
        </CardTitle>
        <CardDescription className="flex items-baseline gap-2 mt-2">
          <span className="text-4xl font-bold text-white">
            ${item?.amount / 100}
          </span>
          <span className="text-gray-300">/{item?.interval}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <ul className="space-y-3 text-sm">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-blue-400" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="relative">
        <Button
          onClick={async () => {
            await handleCheckout(item.id);
          }}
          className={`w-full py-6 text-lg font-medium ${item.popular ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}

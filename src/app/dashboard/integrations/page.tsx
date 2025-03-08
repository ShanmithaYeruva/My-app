import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Check, AlertCircle, ArrowRight } from "lucide-react";

export default async function Integrations() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const platforms = [
    {
      name: "Shopify",
      description:
        "Connect your Shopify store to sync products and pricing data",
      status: "connected",
      icon: <ShoppingBag className="h-8 w-8 text-green-400" />,
    },
    {
      name: "WooCommerce",
      description: "Integrate with WordPress WooCommerce stores",
      status: "not_connected",
      icon: <ShoppingBag className="h-8 w-8 text-blue-400" />,
    },
    {
      name: "Magento",
      description:
        "Connect your Magento store for advanced pricing optimization",
      status: "not_connected",
      icon: <ShoppingBag className="h-8 w-8 text-purple-400" />,
    },
    {
      name: "BigCommerce",
      description: "Sync your BigCommerce store with PriceFlex",
      status: "not_connected",
      icon: <ShoppingBag className="h-8 w-8 text-orange-400" />,
    },
    {
      name: "Stripe",
      description: "Connect your Stripe account for payment processing",
      status: "connected",
      icon: <ShoppingBag className="h-8 w-8 text-green-400" />,
    },
  ];

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full bg-slate-900 min-h-screen text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4 mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Platform Integrations</h1>
              <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
                Add New Integration
              </Button>
            </div>
            <div className="bg-slate-800/50 text-sm p-3 px-4 rounded-lg text-gray-300 flex gap-2 items-center border border-slate-700">
              <AlertCircle size="14" />
              <span>
                Connect your eCommerce platforms to enable automatic pricing
                synchronization and data import.
              </span>
            </div>
          </header>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {platforms.map((platform, index) => (
              <Card
                key={index}
                className="bg-slate-800 border-slate-700 overflow-hidden"
              >
                <div
                  className={`h-1 w-full ${platform.status === "connected" ? "bg-green-500" : "bg-slate-600"}`}
                ></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        {platform.name}
                      </CardTitle>
                      <CardDescription className="text-gray-400 mt-1">
                        {platform.description}
                      </CardDescription>
                    </div>
                    <div className="p-3 bg-slate-700 rounded-md">
                      {platform.icon}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {platform.status === "connected" ? (
                        <>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-green-400 font-medium">
                            Connected
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                          <span className="text-slate-400 font-medium">
                            Not Connected
                          </span>
                        </>
                      )}
                    </div>
                    <Button
                      variant={
                        platform.status === "connected" ? "outline" : "default"
                      }
                      className={
                        platform.status === "connected"
                          ? "border-slate-600 hover:border-slate-500 text-white"
                          : "bg-blue-600 hover:bg-blue-700"
                      }
                    >
                      {platform.status === "connected" ? "Manage" : "Connect"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Data Sync Status */}
          <Card className="bg-slate-800 border-slate-700 mt-8">
            <CardHeader>
              <CardTitle>Data Synchronization Status</CardTitle>
              <CardDescription className="text-gray-400">
                Last sync: 2 hours ago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-700 rounded-md">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>Products synchronized</span>
                  </div>
                  <span className="text-sm text-gray-400">1,245 products</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-700 rounded-md">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>Pricing data updated</span>
                  </div>
                  <span className="text-sm text-gray-400">15 minutes ago</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-700 rounded-md">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-400" />
                    <span>Order history imported</span>
                  </div>
                  <span className="text-sm text-gray-400">2 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </SubscriptionCheck>
  );
}

import DashboardNavbar from "@/components/dashboard-navbar";
import { createClient } from "../../../supabase/server";
import {
  InfoIcon,
  UserCircle,
  BarChart3,
  LineChart,
  Package,
  Settings,
  ArrowRight,
} from "lucide-react";
import { redirect } from "next/navigation";
import { SubscriptionCheck } from "@/components/subscription-check";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full bg-slate-900 min-h-screen text-white">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="bg-slate-800/50 text-sm p-3 px-4 rounded-lg text-gray-300 flex gap-2 items-center border border-slate-700">
              <InfoIcon size="14" />
              <span>
                Welcome to PriceFlex! Get started by exploring your pricing
                dashboard or setting up platform integrations.
              </span>
            </div>
          </header>

          {/* Quick Actions Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/dashboard/pricing-dashboard">
              <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-4 bg-blue-600/20 rounded-full">
                      <BarChart3 className="h-8 w-8 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Pricing Dashboard
                      </h3>
                      <p className="text-sm text-gray-400">
                        View analytics and optimize your pricing strategy
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="#">
              <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-4 bg-purple-600/20 rounded-full">
                      <LineChart className="h-8 w-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Pricing Simulator
                      </h3>
                      <p className="text-sm text-gray-400">
                        Test different pricing strategies and see outcomes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="#">
              <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-4 bg-green-600/20 rounded-full">
                      <Package className="h-8 w-8 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Bundle Builder
                      </h3>
                      <p className="text-sm text-gray-400">
                        Create and optimize product bundles with AI
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="#">
              <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-4 bg-orange-600/20 rounded-full">
                      <Settings className="h-8 w-8 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Integrations
                      </h3>
                      <p className="text-sm text-gray-400">
                        Connect your eCommerce platforms and data sources
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </section>

          {/* User Profile Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-slate-800 border-slate-700 lg:col-span-1">
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription className="text-gray-400">
                  Your account information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4 mb-6">
                  <UserCircle size={64} className="text-blue-400" />
                  <div className="text-center">
                    <h2 className="font-semibold text-xl">
                      {user.user_metadata?.full_name || "User"}
                    </h2>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-gray-400">Account Type</span>
                    <span>Premium</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-gray-400">Member Since</span>
                    <span>
                      {new Date(user.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href="#"
                  className="text-blue-400 text-sm flex items-center gap-1 hover:text-blue-300 transition-colors w-full justify-center"
                >
                  <span>Edit Profile</span>
                  <ArrowRight size={14} />
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription className="text-gray-400">
                  Complete these steps to set up your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-md">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-medium">Create Account</h3>
                      <p className="text-sm text-gray-400">
                        Your account has been successfully created
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-md">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Connect Your Store</h3>
                      <p className="text-sm text-gray-400">
                        Integrate with your eCommerce platform
                      </p>
                      <Link
                        href="#"
                        className="text-blue-400 text-sm flex items-center gap-1 hover:text-blue-300 transition-colors mt-2"
                      >
                        <span>Connect Now</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-md">
                    <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium">Import Products</h3>
                      <p className="text-sm text-gray-400">
                        Import your product catalog to start optimization
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-md">
                    <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium">Run Your First Simulation</h3>
                      <p className="text-sm text-gray-400">
                        Test different pricing strategies with our simulator
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </SubscriptionCheck>
  );
}

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  Package,
  Layers,
  Settings,
  Info,
} from "lucide-react";
import { DollarSign, ShoppingCart } from "@/components/icons";

export default async function PricingDashboard() {
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
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4 mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Pricing Dashboard</h1>
              <div className="flex gap-2">
                <select className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Year to date</option>
                </select>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Export Report
                </button>
              </div>
            </div>
            <div className="bg-slate-800/50 text-sm p-3 px-4 rounded-lg text-gray-300 flex gap-2 items-center border border-slate-700">
              <Info size="14" />
              <span>
                Welcome to your pricing dashboard. Here you can monitor
                performance and optimize your pricing strategy.
              </span>
            </div>
          </header>

          {/* Key Metrics Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                title: "Revenue",
                value: "$24,389",
                change: "+12.5%",
                icon: <DollarSign className="text-green-400" />,
              },
              {
                title: "Conversion Rate",
                value: "3.8%",
                change: "+0.6%",
                icon: <TrendingUp className="text-green-400" />,
              },
              {
                title: "Avg. Order Value",
                value: "$86.42",
                change: "-2.1%",
                icon: <ShoppingCart className="text-red-400" />,
              },
              {
                title: "Price Elasticity",
                value: "1.24",
                change: "Stable",
                icon: <LineChart className="text-blue-400" />,
              },
            ].map((metric, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-400">{metric.title}</p>
                      <p className="text-2xl font-bold mt-1">{metric.value}</p>
                      <p
                        className={`text-xs mt-1 ${metric.change.includes("-") ? "text-red-400" : metric.change === "Stable" ? "text-blue-400" : "text-green-400"}`}
                      >
                        {metric.change}
                      </p>
                    </div>
                    <div className="p-2 bg-slate-700 rounded-md">
                      {metric.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="revenue" className="w-full">
            <TabsList className="bg-slate-800 border border-slate-700 p-1">
              <TabsTrigger
                value="revenue"
                className="data-[state=active]:bg-blue-600"
              >
                Revenue Impact
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="data-[state=active]:bg-blue-600"
              >
                Product Performance
              </TabsTrigger>
              <TabsTrigger
                value="simulator"
                className="data-[state=active]:bg-blue-600"
              >
                Pricing Simulator
              </TabsTrigger>
              <TabsTrigger
                value="bundles"
                className="data-[state=active]:bg-blue-600"
              >
                Bundle Builder
              </TabsTrigger>
            </TabsList>

            {/* Revenue Impact Tab */}
            <TabsContent value="revenue" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                    <CardDescription className="text-gray-400">
                      Revenue impact of pricing changes over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full bg-slate-700/50 rounded-md flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <LineChart className="h-10 w-10 mx-auto mb-2 text-blue-400" />
                        <p>Revenue Trend Chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle>Revenue Distribution</CardTitle>
                    <CardDescription className="text-gray-400">
                      By product category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full bg-slate-700/50 rounded-md flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <PieChart className="h-10 w-10 mx-auto mb-2 text-purple-400" />
                        <p>Revenue Distribution Chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Product Performance Tab */}
            <TabsContent value="products" className="mt-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Product Performance Heatmap</CardTitle>
                      <CardDescription className="text-gray-400">
                        Price elasticity and conversion rates by product
                      </CardDescription>
                    </div>
                    <select className="bg-slate-700 border border-slate-600 rounded-md px-3 py-1 text-sm">
                      <option>All Categories</option>
                      <option>Electronics</option>
                      <option>Clothing</option>
                      <option>Home Goods</option>
                    </select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-96 w-full bg-slate-700/50 rounded-md flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <BarChart3 className="h-10 w-10 mx-auto mb-2 text-blue-400" />
                      <p>Product Performance Heatmap</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing Simulator Tab */}
            <TabsContent value="simulator" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle>Simulation Parameters</CardTitle>
                    <CardDescription className="text-gray-400">
                      Adjust pricing variables
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 block mb-1">
                        Select Products
                      </label>
                      <select className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2">
                        <option>All Products</option>
                        <option>Product Category 1</option>
                        <option>Product Category 2</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 block mb-1">
                        Price Adjustment
                      </label>
                      <div className="flex items-center gap-2">
                        <input type="range" className="w-full" />
                        <span>+15%</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 block mb-1">
                        Discount Strategy
                      </label>
                      <select className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2">
                        <option>No Discount</option>
                        <option>Volume Discount</option>
                        <option>Seasonal Discount</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 block mb-1">
                        Time Period
                      </label>
                      <select className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2">
                        <option>Next 30 days</option>
                        <option>Next Quarter</option>
                        <option>Next Year</option>
                      </select>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-medium mt-4 transition-colors">
                      Run Simulation
                    </button>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle>Simulation Results</CardTitle>
                    <CardDescription className="text-gray-400">
                      Projected outcomes based on parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-slate-700 p-4 rounded-md">
                        <p className="text-sm text-gray-400">Current Revenue</p>
                        <p className="text-xl font-bold">$24,389</p>
                      </div>
                      <div className="bg-slate-700 p-4 rounded-md">
                        <p className="text-sm text-gray-400">
                          Projected Revenue
                        </p>
                        <p className="text-xl font-bold text-green-400">
                          $28,047
                        </p>
                      </div>
                    </div>
                    <div className="h-64 w-full bg-slate-700/50 rounded-md flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <BarChart3 className="h-10 w-10 mx-auto mb-2 text-blue-400" />
                        <p>Before/After Comparison Chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Bundle Builder Tab */}
            <TabsContent value="bundles" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle>Product Selection</CardTitle>
                    <CardDescription className="text-gray-400">
                      Drag products to create bundles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="bg-slate-700 p-3 rounded-md flex justify-between items-center cursor-move">
                        <span>Product A</span>
                        <span className="text-sm text-gray-400">$29.99</span>
                      </div>
                      <div className="bg-slate-700 p-3 rounded-md flex justify-between items-center cursor-move">
                        <span>Product B</span>
                        <span className="text-sm text-gray-400">$49.99</span>
                      </div>
                      <div className="bg-slate-700 p-3 rounded-md flex justify-between items-center cursor-move">
                        <span>Product C</span>
                        <span className="text-sm text-gray-400">$19.99</span>
                      </div>
                      <div className="bg-slate-700 p-3 rounded-md flex justify-between items-center cursor-move">
                        <span>Product D</span>
                        <span className="text-sm text-gray-400">$39.99</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle>Bundle Preview</CardTitle>
                    <CardDescription className="text-gray-400">
                      Configure your product bundle
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-700 p-4 rounded-md mb-4 min-h-40 flex items-center justify-center border-2 border-dashed border-slate-600">
                      <div className="text-center text-gray-400">
                        <Package className="h-8 w-8 mx-auto mb-2" />
                        <p>Drag products here to create a bundle</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">
                          Bundle Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2"
                          placeholder="Summer Special"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">
                          Discount
                        </label>
                        <div className="flex items-center gap-2">
                          <input type="range" className="w-full" />
                          <span>15%</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-600/20 border border-blue-500 rounded-md p-4 mb-4">
                      <div className="flex items-start gap-3">
                        <Layers className="text-blue-400 h-5 w-5 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-400">
                            AI Recommendation
                          </h4>
                          <p className="text-sm text-gray-300">
                            Adding Product E to this bundle could increase
                            conversion rate by 24% based on purchase patterns.
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-medium transition-colors">
                      Save Bundle
                    </button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Integration Status */}
          <section className="mt-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Platform Integrations</CardTitle>
                <CardDescription className="text-gray-400">
                  Status of your eCommerce platform connections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-700 p-4 rounded-md border border-green-500">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Shopify</span>
                      </div>
                      <span className="text-xs text-green-400">Connected</span>
                    </div>
                  </div>
                  <div className="bg-slate-700 p-4 rounded-md border border-slate-600">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                        <span>WooCommerce</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        Not Connected
                      </span>
                    </div>
                  </div>
                  <div className="bg-slate-700 p-4 rounded-md border border-slate-600">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                        <span>Magento</span>
                      </div>
                      <span className="text-xs text-slate-400">
                        Not Connected
                      </span>
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

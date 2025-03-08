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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  BarChart3,
  TrendingUp,
  Settings,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import { DollarSign as DollarSignIcon, ShoppingCart } from "@/components/icons";

export default async function DynamicPricing() {
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
              <h1 className="text-3xl font-bold">Dynamic Pricing</h1>
              <div className="flex gap-2">
                <select className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Home Goods</option>
                </select>
                <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
                  <Settings className="mr-2 h-4 w-4" /> Configure Rules
                </Button>
              </div>
            </div>
            <div className="bg-slate-800/50 text-sm p-3 px-4 rounded-lg text-gray-300 flex gap-2 items-center border border-slate-700">
              <AlertCircle size="14" />
              <span>
                Dynamic pricing automatically adjusts your product prices based
                on demand, competition, and inventory levels.
              </span>
            </div>
          </header>

          {/* Key Metrics Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                title: "Revenue Impact",
                value: "+$3,245",
                change: "+8.2%",
                icon: <DollarSignIcon className="text-green-400" />,
              },
              {
                title: "Price Changes",
                value: "142",
                change: "Last 24 hours",
                icon: <TrendingUp className="text-blue-400" />,
              },
              {
                title: "Avg. Price Increase",
                value: "4.3%",
                change: "+0.8%",
                icon: <LineChart className="text-purple-400" />,
              },
              {
                title: "Conversion Rate",
                value: "3.8%",
                change: "+0.5%",
                icon: <ShoppingCart className="text-green-400" />,
              },
            ].map((metric, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-400">{metric.title}</p>
                      <p className="text-2xl font-bold mt-1">{metric.value}</p>
                      <p
                        className={`text-xs mt-1 ${metric.change.includes("-") ? "text-red-400" : metric.change.includes("+") ? "text-green-400" : "text-blue-400"}`}
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

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-slate-800 border border-slate-700 p-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-blue-600"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="data-[state=active]:bg-blue-600"
              >
                Products
              </TabsTrigger>
              <TabsTrigger
                value="rules"
                className="data-[state=active]:bg-blue-600"
              >
                Pricing Rules
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-blue-600"
              >
                Price History
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle>Dynamic Pricing Impact</CardTitle>
                    <CardDescription className="text-gray-400">
                      Revenue comparison with and without dynamic pricing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full bg-slate-700/50 rounded-md flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <LineChart className="h-10 w-10 mx-auto mb-2 text-blue-400" />
                        <p>Revenue Impact Chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle>Price Change Distribution</CardTitle>
                    <CardDescription className="text-gray-400">
                      By adjustment percentage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full bg-slate-700/50 rounded-md flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <BarChart3 className="h-10 w-10 mx-auto mb-2 text-purple-400" />
                        <p>Price Change Distribution Chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800 border-slate-700 mt-6">
                <CardHeader>
                  <CardTitle>Dynamic Pricing Activity</CardTitle>
                  <CardDescription className="text-gray-400">
                    Recent price adjustments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Product
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Previous Price
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            New Price
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Change
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Reason
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            product: "Product A",
                            previousPrice: "$29.99",
                            newPrice: "$32.99",
                            change: "+10%",
                            reason: "High demand",
                            time: "2 hours ago",
                          },
                          {
                            product: "Product B",
                            previousPrice: "$49.99",
                            newPrice: "$45.99",
                            change: "-8%",
                            reason: "Competitor price drop",
                            time: "5 hours ago",
                          },
                          {
                            product: "Product C",
                            previousPrice: "$19.99",
                            newPrice: "$21.99",
                            change: "+10%",
                            reason: "Low inventory",
                            time: "1 day ago",
                          },
                          {
                            product: "Product D",
                            previousPrice: "$39.99",
                            newPrice: "$42.99",
                            change: "+7.5%",
                            reason: "High demand",
                            time: "1 day ago",
                          },
                        ].map((item, index) => (
                          <tr key={index} className="border-b border-slate-700">
                            <td className="py-3 px-4">{item.product}</td>
                            <td className="py-3 px-4">{item.previousPrice}</td>
                            <td className="py-3 px-4">{item.newPrice}</td>
                            <td
                              className={`py-3 px-4 ${item.change.includes("-") ? "text-red-400" : "text-green-400"}`}
                            >
                              {item.change}
                            </td>
                            <td className="py-3 px-4">{item.reason}</td>
                            <td className="py-3 px-4 text-gray-400">
                              {item.time}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="mt-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Products with Dynamic Pricing</CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage which products use dynamic pricing
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-sm"
                      />
                      <Button
                        variant="outline"
                        className="border-slate-600 text-white"
                      >
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Product
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Category
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Base Price
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Current Price
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Status
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            product: "Product A",
                            category: "Electronics",
                            basePrice: "$29.99",
                            currentPrice: "$32.99",
                            status: "active",
                          },
                          {
                            product: "Product B",
                            category: "Electronics",
                            basePrice: "$49.99",
                            currentPrice: "$45.99",
                            status: "active",
                          },
                          {
                            product: "Product C",
                            category: "Accessories",
                            basePrice: "$19.99",
                            currentPrice: "$21.99",
                            status: "active",
                          },
                          {
                            product: "Product D",
                            category: "Home Goods",
                            basePrice: "$39.99",
                            currentPrice: "$42.99",
                            status: "active",
                          },
                          {
                            product: "Product E",
                            category: "Electronics",
                            basePrice: "$59.99",
                            currentPrice: "$59.99",
                            status: "paused",
                          },
                        ].map((item, index) => (
                          <tr key={index} className="border-b border-slate-700">
                            <td className="py-3 px-4">{item.product}</td>
                            <td className="py-3 px-4">{item.category}</td>
                            <td className="py-3 px-4">{item.basePrice}</td>
                            <td className="py-3 px-4">{item.currentPrice}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${item.status === "active" ? "bg-green-500/20 text-green-400" : "bg-slate-600/20 text-slate-400"}`}
                              >
                                {item.status === "active" ? "Active" : "Paused"}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-slate-600 text-white"
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Rules Tab */}
            <TabsContent value="rules" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle>Pricing Rules</CardTitle>
                    <CardDescription className="text-gray-400">
                      Configure how prices adjust automatically
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">
                          Rule Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2"
                          placeholder="High Demand Rule"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">
                          Apply To
                        </label>
                        <select className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2">
                          <option>All Products</option>
                          <option>Electronics</option>
                          <option>Specific Products</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">
                          Condition
                        </label>
                        <select className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2">
                          <option>When demand increases</option>
                          <option>When inventory is low</option>
                          <option>When competitor prices change</option>
                          <option>Time-based (weekends, holidays)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">
                          Price Adjustment
                        </label>
                        <div className="flex items-center gap-2">
                          <input type="range" className="w-full" />
                          <span>+5%</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">
                          Maximum Adjustment
                        </label>
                        <div className="flex items-center gap-2">
                          <input type="range" className="w-full" />
                          <span>15%</span>
                        </div>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
                        Save Rule
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle>Active Pricing Rules</CardTitle>
                    <CardDescription className="text-gray-400">
                      Your current dynamic pricing rules
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "High Demand Rule",
                          applies: "Electronics",
                          condition: "When demand increases",
                          adjustment: "+5% to +15%",
                          status: "active",
                        },
                        {
                          name: "Low Inventory Alert",
                          applies: "All Products",
                          condition: "When inventory is below 10 units",
                          adjustment: "+10%",
                          status: "active",
                        },
                        {
                          name: "Competitor Matching",
                          applies: "Electronics",
                          condition: "When competitor prices decrease",
                          adjustment: "-5% to match",
                          status: "active",
                        },
                        {
                          name: "Weekend Special",
                          applies: "Accessories",
                          condition: "Fridays through Sundays",
                          adjustment: "-8%",
                          status: "paused",
                        },
                      ].map((rule, index) => (
                        <div
                          key={index}
                          className="bg-slate-700 p-4 rounded-md"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{rule.name}</h3>
                              <div className="text-sm text-gray-400 mt-1">
                                Applies to: {rule.applies}
                              </div>
                            </div>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${rule.status === "active" ? "bg-green-500/20 text-green-400" : "bg-slate-600/20 text-slate-400"}`}
                            >
                              {rule.status === "active" ? "Active" : "Paused"}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                              <span className="text-xs text-gray-400 block">
                                Condition
                              </span>
                              <span className="text-sm">{rule.condition}</span>
                            </div>
                            <div>
                              <span className="text-xs text-gray-400 block">
                                Price Adjustment
                              </span>
                              <span className="text-sm">{rule.adjustment}</span>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-600 text-white"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-slate-600 text-white"
                            >
                              {rule.status === "active" ? "Pause" : "Activate"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Price History Tab */}
            <TabsContent value="history" className="mt-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Price History</CardTitle>
                      <CardDescription className="text-gray-400">
                        Historical price changes for your products
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <select className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-sm">
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>Last 6 months</option>
                        <option>Last year</option>
                      </select>
                      <Button
                        variant="outline"
                        className="border-slate-600 text-white"
                      >
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full bg-slate-700/50 rounded-md flex items-center justify-center mb-6">
                    <div className="text-center text-gray-400">
                      <LineChart className="h-10 w-10 mx-auto mb-2 text-blue-400" />
                      <p>Price History Chart</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Date
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Product
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Old Price
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            New Price
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Change
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                            Rule Applied
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            date: "Jun 15, 2023",
                            product: "Product A",
                            oldPrice: "$29.99",
                            newPrice: "$32.99",
                            change: "+10%",
                            rule: "High Demand Rule",
                          },
                          {
                            date: "Jun 14, 2023",
                            product: "Product B",
                            oldPrice: "$49.99",
                            newPrice: "$45.99",
                            change: "-8%",
                            rule: "Competitor Matching",
                          },
                          {
                            date: "Jun 12, 2023",
                            product: "Product C",
                            oldPrice: "$19.99",
                            newPrice: "$21.99",
                            change: "+10%",
                            rule: "Low Inventory Alert",
                          },
                          {
                            date: "Jun 10, 2023",
                            product: "Product A",
                            oldPrice: "$27.99",
                            newPrice: "$29.99",
                            change: "+7.1%",
                            rule: "High Demand Rule",
                          },
                          {
                            date: "Jun 8, 2023",
                            product: "Product D",
                            oldPrice: "$39.99",
                            newPrice: "$42.99",
                            change: "+7.5%",
                            rule: "High Demand Rule",
                          },
                        ].map((item, index) => (
                          <tr key={index} className="border-b border-slate-700">
                            <td className="py-3 px-4">{item.date}</td>
                            <td className="py-3 px-4">{item.product}</td>
                            <td className="py-3 px-4">{item.oldPrice}</td>
                            <td className="py-3 px-4">{item.newPrice}</td>
                            <td
                              className={`py-3 px-4 ${item.change.includes("-") ? "text-red-400" : "text-green-400"}`}
                            >
                              {item.change}
                            </td>
                            <td className="py-3 px-4">{item.rule}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </SubscriptionCheck>
  );
}

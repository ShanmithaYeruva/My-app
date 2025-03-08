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
import { BarChart3, Users, Tag, Calendar, Plus, Zap } from "lucide-react";

export default async function Discounts() {
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
              <h1 className="text-3xl font-bold">Personalized Discounts</h1>
              <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
                <Plus className="mr-2 h-4 w-4" /> Create Discount
              </Button>
            </div>
            <div className="bg-slate-800/50 text-sm p-3 px-4 rounded-lg text-gray-300 flex gap-2 items-center border border-slate-700">
              <Zap size="14" />
              <span>
                Create targeted discount campaigns based on customer behavior and purchase history.
              </span>
            </div>
          </header>

          {/* Discount Stats */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                title: "Active Discounts",
                value: "8",
                icon: <Tag className="text-blue-400" />,
              },
              {
                title: "Customers Targeted",
                value: "1,245",
                icon: <Users className="text-purple-400" />,
              },
              {
                title: "Avg. Discount Rate",
                value: "12.5%",
                icon: <BarChart3 className="text-green-400" />,
              },
              {
                title: "Upcoming Campaigns",
                value: "3",
                icon: <Calendar className="text-orange-400" />,
              },
            ].map((stat, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className="p-2 bg-slate-700 rounded-md">
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          {/* Main Content Tabs */}
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="bg-slate-800 border border-slate-700 p-1">
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-blue-600"
              >
                Active Discounts
              </TabsTrigger>
              <TabsTrigger
                value="scheduled"
                className="data-[state=active]:bg-blue-600"
              >
                Scheduled
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-blue-600"
              >
                Completed
              </TabsTrigger>
              <TabsTrigger
                value="segments"
                className="data-[state=active]:bg-blue-600"
              >
                Customer Segments
              </TabsTrigger>
            </TabsList>

            {/* Active Discounts Tab */}
            <TabsContent value="active" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "First-Time Buyer",
                    type: "Percentage",
                    value: "15% off",
                    target: "New customers",
                    usage: "124/500",
                    expires: "Jul 15, 2023",
                  },
                  {
                    name: "Loyalty Reward",
                    type: "Percentage",
                    value: "10% off",
                    target: "Customers with 5+ orders",
                    usage: "287/1000",
                    expires: "Aug 1, 2023",
                  },
                  {
                    name: "Cart Abandonment",
                    type: "Fixed Amount",
                    value: "$10 off",
                    target: "Abandoned carts",
                    usage: "56/200",
                    expires: "Jul 20, 2023",
                  },
                  {
                    name: "Electronics Special",
                    type: "Percentage",
                    value: "20% off",
                    target: "Electronics buyers",
                    usage: "189/300",
                    expires: "Jul 25, 2023",
                  },
                  {
                    name: "Win-Back Campaign",
                    type: "Percentage",
                    value: "25% off",
                    target: "Inactive customers (90+ days)",
                    usage: "43/200",
                    expires: "Aug 15, 2023",
                  },
                ].map((discount, index) => (
                  <Card key={index} className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all">
                    <CardHeader>
                      <CardTitle>{discount.name}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {discount.type}: {discount.value}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-400">Target Segment</p>
                          <p className="text-sm">{discount.target}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Usage</p>
                          <p className="text-sm">{discount.usage}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Expires</p>
                          <p className="text-sm">{discount.expires}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-white">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 border-slate-600 text-white">
                            Pause
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Scheduled Discounts Tab */}
            <TabsContent value="scheduled" className="mt-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle>Upcoming Discount Campaigns</CardTitle>
                  <CardDescription className="text-gray-400">
                    Scheduled to start automatically
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Campaign Name</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Discount</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Target Segment</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Start Date</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">End Date</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "Summer Sale",
                            discount: "15% off",
                            target: "All customers",
                            startDate: "Jul 1, 2023",
                            endDate: "Aug 31, 2023",
                          },
                          {
                            name: "Back to School",
                            discount: "10% off",
                            target: "Electronics buyers",
                            startDate: "Aug 15, 2023",
                            endDate: "Sep 15, 2023",
                          },
                          {
                            name: "Holiday Preview",
                            discount: "20% off",
                            target: "Premium customers",
                            startDate: "Nov 1, 2023",
                            endDate: "Nov 30, 2023",
                          },
                        ].map((campaign, index) => (
                          <tr key={index} className="border-b border-slate-700">
                            <td className="py-3 px-4">{campaign.name}</td>
                            <td className="py-3 px-4">{campaign.discount}</td>
                            <td className="py-3 px-4">{campaign.target}</td>
                            <td className="py-3 px-4">{campaign.startDate}</td>
                            <td className="py-3 px-4">{campaign.endDate}</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="border-slate-600 text-white">
                                  Edit
                                </Button>
                                <Button variant="outline" size="sm" className="border-slate-600 text-white">
                                  Cancel
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Completed Discounts Tab */}
            <TabsContent value="completed" className="mt-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Completed Campaigns</CardTitle>
                      <CardDescription className="text-gray-400">
                        Historical discount performance
                      </CardDescription>
                    </div>
                    <Button variant="outline" className="border-slate-600 text-white">
                      Export Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full bg-slate-700/50 rounded-md flex items-center justify-center mb-6">
                    <div className="text-center text-gray-400">
                      <BarChart3 className="h-10 w-10 mx-auto mb-2 text-blue-400" />
                      <p>Campaign Performance Chart</p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-700">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Campaign Name</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Discount</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Target Segment</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Redemptions</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Revenue Impact</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Period</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "Spring Sale",
                            discount: "15% off",
                            target: "All customers",
                            redemptions: "845/1000",
                            impact: "+$12,450",
                            period: "Mar 1 - Apr 15, 2023",
                          },
                          {
                            name: "Mother's Day",
                            discount: "10% off",
                            target: "Previous gift buyers",
                            redemptions: "324/500",
                            impact: "+$5,890",
                            period: "May 1 - May 14, 2023",
                          },
                          {
                            name: "Memorial Day",
                            discount: "20% off",
                            target: "All customers",
                            redemptions: "567/800",
                            impact: "+$9,340",
                            period: "May 25 - May 31, 2023",
                          },
                        ].map((campaign, index) => (
                          <tr key={index} className="border-b border-slate-700">
                            <td className="py-3 px-4">{campaign.name}</td>
                            <td className="py-3 px-4">{campaign.discount}</td>
                            <td className="py-3 px-4">{campaign.target}</td>
                            <td className="py-3 px-4">{campaign.redemptions}</td>
                            <td className="py-3 px-4 text-green-400">{campaign.impact}</td>
                            <td className="py-3 px-4">{campaign.period}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Customer Segments Tab */}
            <TabsContent value="segments" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1 bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle>Create Customer Segment</CardTitle>
                    <CardDescription className="text-gray-400">
                      Define groups for targeted discounts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">
                          Segment Name
                        </label>
                        <input
                          type="text"
                          className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2"
                          placeholder="High-Value Customers"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">
                          Segment Type
                        </label>
                        <select className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2">
                          <option>Purchase Behavior</option>
                          <option>Demographics</option>
                          <option>Product Interest</option>
                          <option>Custom</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">
                          Conditions
                        </label>
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <select className="flex-1 bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-sm">
                              <option>Total Spent</option>
                              <option>Order Count</option>
                              <option>Last Purchase</option>
                              <option>Product Category</option>
                            </select>
                            <select className="w-24 bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-sm">
                              <option>></option>
                              <option><</option>
                              <option>=</option>
                            </select>
                            <input
                              type="text"
                              className="flex-1 bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-sm"
                              placeholder="Value"
                            />
                          </div>
                          <Button variant="outline" size="sm" className="w-full border-slate-600 text-white">
                            <Plus className="mr-2 h-3 w-3" /> Add Condition
                          </Button>
                        </div>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
                        Create Segment
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle>Customer Segments</CardTitle>
                    <CardDescription className="text-gray-400">
                      Your defined customer groups
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "High-Value Customers",
                          criteria: "Total spent > $500",
                          count: "245 customers",
                          lastUpdated: "2 days ago",
                        },
                        {
                          name: "Frequent Shoppers",
                          criteria: "Order count > 5",
                          count: "387 customers",
                          lastUpdated: "1 day ago",
                        },
                        {
                          name: "New Customers",
                          criteria: "First order within last 30 days",
                          count: "128 customers",
                          lastUpdated: "Today",
                        },
                        {
                          name: "At-Risk Customers",
                          criteria: "No purchase in 60+ days",
                          count: "312 customers",
                          lastUpdated: "3 days ago",
                        },
                        {
                          name: "Electronics Buyers",
                          criteria: "Purchased from Electronics category",
                          count: "523 customers",
                          lastUpdated: "5 days ago",
                        },
                      ].map((segment, index) => (
                        <div key={index} className="bg-slate-700 p-4 rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{segment.name}</h3>
                              <div className="text-sm text-gray-400 mt-1">
                                {segment.criteria}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{segment.count}</div>
                              <div className="text-xs text-gray-400">Updated {segment.lastUpdated}</div>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" size="sm" className="border-slate-600 text-white">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="border-slate-600 text-white">
                              Create Discount
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </SubscriptionCheck>
  );
}

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
  UserCircle,
  Mail,
  Building,
  CreditCard,
  Shield,
  Bell,
  Key,
} from "lucide-react";

export default async function Profile() {
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
            <h1 className="text-3xl font-bold">Account Settings</h1>
          </header>

          {/* Profile Content */}
          <Tabs defaultValue="profile" className="w-full">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-64">
                <TabsList className="flex flex-col w-full bg-slate-800 border border-slate-700 p-1 rounded-md">
                  <TabsTrigger
                    value="profile"
                    className="justify-start w-full data-[state=active]:bg-blue-600 mb-1"
                  >
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="billing"
                    className="justify-start w-full data-[state=active]:bg-blue-600 mb-1"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing & Plans
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="justify-start w-full data-[state=active]:bg-blue-600 mb-1"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="justify-start w-full data-[state=active]:bg-blue-600 mb-1"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1">
                {/* Profile Tab */}
                <TabsContent value="profile" className="mt-0">
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription className="text-gray-400">
                        Update your account details
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex flex-col items-center">
                          <div className="w-32 h-32 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                            <UserCircle className="w-20 h-20 text-gray-400" />
                          </div>
                          <Button
                            variant="outline"
                            className="border-slate-600 text-white"
                          >
                            Change Avatar
                          </Button>
                        </div>

                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm text-gray-400 block mb-1">
                                Full Name
                              </label>
                              <input
                                type="text"
                                className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2"
                                defaultValue={
                                  user.user_metadata?.full_name || ""
                                }
                              />
                            </div>
                            <div>
                              <label className="text-sm text-gray-400 block mb-1">
                                Email Address
                              </label>
                              <input
                                type="email"
                                className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2"
                                defaultValue={user.email || ""}
                                disabled
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-sm text-gray-400 block mb-1">
                              Company
                            </label>
                            <input
                              type="text"
                              className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2"
                              placeholder="Your company name"
                            />
                          </div>

                          <div>
                            <label className="text-sm text-gray-400 block mb-1">
                              Bio
                            </label>
                            <textarea
                              className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 min-h-24"
                              placeholder="Tell us about yourself or your business"
                            ></textarea>
                          </div>

                          <div className="flex justify-end">
                            <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Billing Tab */}
                <TabsContent value="billing" className="mt-0">
                  <Card className="bg-slate-800 border-slate-700 mb-6">
                    <CardHeader>
                      <CardTitle>Current Plan</CardTitle>
                      <CardDescription className="text-gray-400">
                        Your subscription details
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-blue-600/20 border border-blue-500 rounded-md p-4 mb-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-white">
                              Pro Plan
                            </h3>
                            <p className="text-gray-300">$79/month</p>
                          </div>
                          <div className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
                            Active
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between py-2 border-b border-slate-700">
                          <span className="text-gray-400">Billing Cycle</span>
                          <span>Monthly</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-700">
                          <span className="text-gray-400">Next Payment</span>
                          <span>July 15, 2023</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-700">
                          <span className="text-gray-400">Payment Method</span>
                          <span>Visa ending in 4242</span>
                        </div>
                      </div>

                      <div className="flex gap-4 mt-6">
                        <Button
                          variant="outline"
                          className="border-slate-600 text-white"
                        >
                          Change Plan
                        </Button>
                        <Button
                          variant="outline"
                          className="border-slate-600 text-white"
                        >
                          Update Payment Method
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle>Billing History</CardTitle>
                      <CardDescription className="text-gray-400">
                        Your recent invoices
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-slate-700">
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                                Invoice
                              </th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                                Date
                              </th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                                Amount
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
                                invoice: "INV-001",
                                date: "Jun 15, 2023",
                                amount: "$79.00",
                                status: "Paid",
                              },
                              {
                                invoice: "INV-002",
                                date: "May 15, 2023",
                                amount: "$79.00",
                                status: "Paid",
                              },
                              {
                                invoice: "INV-003",
                                date: "Apr 15, 2023",
                                amount: "$79.00",
                                status: "Paid",
                              },
                            ].map((invoice, index) => (
                              <tr
                                key={index}
                                className="border-b border-slate-700"
                              >
                                <td className="py-3 px-4">{invoice.invoice}</td>
                                <td className="py-3 px-4">{invoice.date}</td>
                                <td className="py-3 px-4">{invoice.amount}</td>
                                <td className="py-3 px-4">
                                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                                    {invoice.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-slate-600 text-white"
                                  >
                                    Download
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

                {/* Security Tab */}
                <TabsContent value="security" className="mt-0">
                  <Card className="bg-slate-800 border-slate-700 mb-6">
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription className="text-gray-400">
                        Update your password
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-gray-400 block mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2"
                            placeholder="Enter current password"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 block mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2"
                            placeholder="Enter new password"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 block mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2"
                            placeholder="Confirm new password"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
                            Update Password
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle>Two-Factor Authentication</CardTitle>
                      <CardDescription className="text-gray-400">
                        Add an extra layer of security to your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">
                            Two-Factor Authentication
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            Protect your account with an additional security
                            layer
                          </p>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
                          Enable 2FA
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="mt-0">
                  <Card className="bg-slate-800 border-slate-700">
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription className="text-gray-400">
                        Manage how you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-3">
                            Email Notifications
                          </h3>
                          <div className="space-y-3">
                            {[
                              {
                                title: "Price Change Alerts",
                                description:
                                  "Get notified when prices are automatically adjusted",
                                checked: true,
                              },
                              {
                                title: "Revenue Reports",
                                description:
                                  "Weekly summary of your pricing performance",
                                checked: true,
                              },
                              {
                                title: "New Discount Campaigns",
                                description:
                                  "Notifications about new discount opportunities",
                                checked: false,
                              },
                              {
                                title: "Product Updates",
                                description:
                                  "Learn about new features and improvements",
                                checked: true,
                              },
                            ].map((notification, index) => (
                              <div key={index} className="flex items-start">
                                <div className="flex items-center h-5 mt-1">
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-blue-600"
                                    defaultChecked={notification.checked}
                                  />
                                </div>
                                <div className="ml-3">
                                  <label className="font-medium">
                                    {notification.title}
                                  </label>
                                  <p className="text-sm text-gray-400">
                                    {notification.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-3">
                            Dashboard Notifications
                          </h3>
                          <div className="space-y-3">
                            {[
                              {
                                title: "Price Change Alerts",
                                description:
                                  "Show notifications in dashboard when prices change",
                                checked: true,
                              },
                              {
                                title: "AI Recommendations",
                                description:
                                  "Get AI-powered pricing suggestions in your dashboard",
                                checked: true,
                              },
                            ].map((notification, index) => (
                              <div key={index} className="flex items-start">
                                <div className="flex items-center h-5 mt-1">
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-blue-600"
                                    defaultChecked={notification.checked}
                                  />
                                </div>
                                <div className="ml-3">
                                  <label className="font-medium">
                                    {notification.title}
                                  </label>
                                  <p className="text-sm text-gray-400">
                                    {notification.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
                            Save Preferences
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </main>
    </SubscriptionCheck>
  );
}

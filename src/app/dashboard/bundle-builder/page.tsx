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
import { Package, Plus, Layers, ArrowRight, Zap } from "lucide-react";

export default async function BundleBuilder() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const bundles = [
    {
      id: 1,
      name: "Summer Essentials",
      products: 4,
      discount: "15%",
      status: "active",
    },
    {
      id: 2,
      name: "Home Office Bundle",
      products: 3,
      discount: "10%",
      status: "active",
    },
    {
      id: 3,
      name: "Holiday Special",
      products: 5,
      discount: "20%",
      status: "draft",
    },
  ];

  const products = [
    { id: 1, name: "Product A", price: 29.99, category: "Electronics" },
    { id: 2, name: "Product B", price: 49.99, category: "Electronics" },
    { id: 3, name: "Product C", price: 19.99, category: "Accessories" },
    { id: 4, name: "Product D", price: 39.99, category: "Home Goods" },
    { id: 5, name: "Product E", price: 59.99, category: "Electronics" },
    { id: 6, name: "Product F", price: 24.99, category: "Accessories" },
  ];

  return (
    <SubscriptionCheck>
      <DashboardNavbar />
      <main className="w-full bg-slate-900 min-h-screen text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4 mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Bundle Builder</h1>
              <Button className="bg-blue-600 hover:bg-blue-700 transition-colors">
                <Plus className="mr-2 h-4 w-4" /> Create New Bundle
              </Button>
            </div>
            <div className="bg-slate-800/50 text-sm p-3 px-4 rounded-lg text-gray-300 flex gap-2 items-center border border-slate-700">
              <Zap size="14" />
              <span>
                Create product bundles with AI-recommended combinations to
                increase average order value.
              </span>
            </div>
          </header>

          {/* Existing Bundles */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Your Bundles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bundles.map((bundle) => (
                <Card
                  key={bundle.id}
                  className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-all cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{bundle.name}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${bundle.status === "active" ? "bg-green-500/20 text-green-400" : "bg-slate-600/20 text-slate-400"}`}
                        >
                          {bundle.status === "active" ? "Active" : "Draft"}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-700 rounded-md">
                        <Package className="h-5 w-5 text-blue-400" />
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Products</span>
                        <span>{bundle.products}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Discount</span>
                        <span>{bundle.discount}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-slate-600 hover:border-blue-500 text-white"
                    >
                      Edit Bundle
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Bundle Builder Interface */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Available Products</CardTitle>
                <CardDescription className="text-gray-400">
                  Drag products to create a bundle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2"
                  />
                </div>
                <div className="space-y-2">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-slate-700 p-3 rounded-md flex justify-between items-center cursor-move hover:bg-slate-600 transition-colors"
                    >
                      <div>
                        <span>{product.name}</span>
                        <div className="text-xs text-gray-400">
                          {product.category}
                        </div>
                      </div>
                      <span className="text-sm font-medium">
                        ${product.price}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Bundle Configuration</CardTitle>
                <CardDescription className="text-gray-400">
                  Configure your product bundle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-700 p-4 rounded-md mb-6 min-h-40 flex items-center justify-center border-2 border-dashed border-slate-600">
                  <div className="text-center text-gray-400">
                    <Package className="h-8 w-8 mx-auto mb-2" />
                    <p>Drag products here to create a bundle</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
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

                <div className="bg-blue-600/20 border border-blue-500 rounded-md p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Layers className="text-blue-400 h-5 w-5 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-400">
                        AI Recommendation
                      </h4>
                      <p className="text-sm text-gray-300">
                        Based on purchase patterns, adding Product E to this
                        bundle could increase conversion rate by 24%.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border-blue-500 text-blue-400 hover:bg-blue-500/20"
                      >
                        Add Recommended Product
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    className="border-slate-600 text-white"
                  >
                    Save as Draft
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Publish Bundle
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </SubscriptionCheck>
  );
}

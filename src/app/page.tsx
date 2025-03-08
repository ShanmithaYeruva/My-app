import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import { createClient } from "../../supabase/server";
import {
  ArrowUpRight,
  BarChart3,
  TrendingUp,
  PieChart,
  LineChart,
  ShoppingBag,
  Zap,
  DollarSign,
  Layers,
} from "lucide-react";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Use mock pricing data instead of slow Stripe integration
  const { mockPricingPlans } = await import("@/data/mock-pricing-data");
  const plans = mockPricingPlans;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Navbar />
      <Hero />

      {/* Dashboard Preview Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Powerful Analytics Dashboard
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Visualize your pricing strategy with our intuitive dashboard
              designed for eCommerce businesses.
            </p>
          </div>
          <div className="relative mx-auto max-w-5xl rounded-xl overflow-hidden shadow-2xl border border-gray-700">
            <div className="w-full h-[675px] bg-slate-800 flex items-center justify-center">
              <BarChart3 className="w-24 h-24 text-blue-500/30" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl font-bold mb-2">
                Real-time Pricing Intelligence
              </h3>
              <p className="text-sm text-gray-300">
                Monitor performance, simulate strategies, and optimize your
                pricing in one place
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">
              AI-Powered Pricing Features
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our platform combines advanced analytics with artificial
              intelligence to optimize your pricing strategy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Dynamic Pricing Analytics",
                description:
                  "Visualize key metrics and track performance with interactive charts and heatmaps",
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: "Revenue Impact Forecasting",
                description:
                  "AI-powered projections to predict how pricing changes affect your bottom line",
              },
              {
                icon: <LineChart className="w-6 h-6" />,
                title: "Pricing Simulator",
                description:
                  "Test different pricing strategies and see projected outcomes before implementation",
              },
              {
                icon: <Layers className="w-6 h-6" />,
                title: "Smart Bundle Builder",
                description:
                  "Create optimal product bundles with AI recommendations for maximum profit",
              },
              {
                icon: <ShoppingBag className="w-6 h-6" />,
                title: "eCommerce Integration",
                description:
                  "Seamless connection with Shopify, WooCommerce, and other major platforms",
              },
              {
                icon: <DollarSign className="w-6 h-6" />,
                title: "Competitor Price Tracking",
                description:
                  "Monitor competitor pricing and automatically adjust your strategy",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-slate-700 rounded-xl border border-slate-600 hover:border-blue-500 transition-all"
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">
              How PriceFlex Works
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our platform makes pricing optimization simple and effective
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect Your Store</h3>
              <p className="text-gray-300">
                Integrate with your eCommerce platform in just a few clicks
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyze & Simulate</h3>
              <p className="text-gray-300">
                Review your data and test different pricing strategies
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Optimize & Grow</h3>
              <p className="text-gray-300">
                Implement AI recommendations and watch your revenue increase
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">27%</div>
              <div className="text-blue-100">Average Revenue Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-blue-100">eCommerce Stores</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$500M+</div>
              <div className="text-blue-100">Revenue Optimized</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-slate-800" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Pricing Plans
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose the perfect plan for your business size and needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Optimize Your Pricing?
          </h2>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of eCommerce businesses already increasing their
            revenue with PriceFlex
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-8 py-4 text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
          >
            Get Started Free
            <ArrowUpRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

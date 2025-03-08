import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  BarChart3,
  LineChart,
  DollarSign,
} from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-slate-900">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-900 to-purple-900/30 opacity-70" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-8 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                PriceFlex
              </span>{" "}
              - AI-Driven Pricing Optimization
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Maximize your eCommerce revenue with our intelligent pricing
              platform. Data-driven insights and AI recommendations to optimize
              your pricing strategy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-lg font-medium shadow-lg shadow-blue-600/20"
              >
                Get Started Free
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#pricing"
                className="inline-flex items-center px-8 py-4 text-gray-200 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors text-lg font-medium"
              >
                View Pricing
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <BarChart3 className="w-8 h-8 text-blue-400 mb-2" />
                <span className="text-white font-medium">
                  Real-time Analytics
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <LineChart className="w-8 h-8 text-purple-400 mb-2" />
                <span className="text-white font-medium">
                  Pricing Simulator
                </span>
              </div>
              <div className="flex flex-col items-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <DollarSign className="w-8 h-8 text-green-400 mb-2" />
                <span className="text-white font-medium">
                  Revenue Optimization
                </span>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

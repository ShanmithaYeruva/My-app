"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  UserCircle,
  BarChart3,
  Home,
  LineChart,
  Package,
  Settings,
  Bell,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();

  return (
    <nav className="w-full border-b border-slate-800 bg-slate-900 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            prefetch
            className="text-xl font-bold text-white flex items-center gap-2"
          >
            <BarChart3 className="h-6 w-6 text-blue-400" />
            <span>PriceFlex</span>
          </Link>
          <div className="hidden md:flex gap-6 ml-10">
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <Home className="h-4 w-4" />
              <span>Overview</span>
            </Link>
            <Link
              href="/dashboard/pricing-dashboard"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <LineChart className="h-4 w-4" />
              <span>Pricing Dashboard</span>
            </Link>
            <Link
              href="/dashboard/dynamic-pricing"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <LineChart className="h-4 w-4" />
              <span>Dynamic Pricing</span>
            </Link>
            <Link
              href="/dashboard/bundle-builder"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <Package className="h-4 w-4" />
              <span>Bundle Builder</span>
            </Link>
            <Link
              href="/dashboard/discounts"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <Tag className="h-4 w-4" />
              <span>Discounts</span>
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white"
              >
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-slate-800 border-slate-700 text-white"
            >
              <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer">
                <Link href="/dashboard/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-700 cursor-pointer">
                <Link href="/dashboard/integrations" className="w-full">
                  Integrations
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-slate-700 cursor-pointer"
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/");
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

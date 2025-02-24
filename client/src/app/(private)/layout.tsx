import Providers from "../providers";
import { DashboardSidebar } from "@/modules/dashboard/components/global/dashboard-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Geist } from "next/font/google";
import { DashboardHeader } from "@/modules/dashboard/components/global/dashboard-header";

const geisSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`${geisSans.variable} antialiased bg-purple-600 font-geist`}>
            <Providers>
                <SidebarProvider className="flex flex-col">
                    <DashboardHeader />
                    <div className="flex flex-1">
                        <DashboardSidebar />
                        <SidebarInset className="p-4">
                            {children}
                        </SidebarInset>
                    </div>
                </SidebarProvider>
            </Providers>
        </div>
    )
}

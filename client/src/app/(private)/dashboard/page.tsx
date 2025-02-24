import { UserWelcome } from "@/modules/dashboard/home/user-welcome";

export default function DashboardPage() {
    return (
        <div className="flex flex-col h-full gap-4">
            <UserWelcome />
        </div>
    )
}

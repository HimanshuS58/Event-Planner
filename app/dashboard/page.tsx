import { Suspense } from "react";
import { DashboardContent } from "@/components/dashboard-content";
import { getSession } from "@/lib/auth/server";

async function DashboardSession() {
    const session = await getSession();

    return (
        <DashboardContent userId={session.data?.user.id} />
    );
}

export default function Dashboard() {
    return (
        <Suspense fallback={<div>Loading dashboard...</div>}>
            <DashboardSession />
        </Suspense>
    );
}
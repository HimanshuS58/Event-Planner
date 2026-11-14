import { Suspense } from "react";
import { connection } from "next/server";
import { EventDetailContent } from "@/components/event-detail-content";
import { getSession } from "@/lib/auth/server";

async function EventDetails({ params }: { params: Promise<{ eventId: string }> }) {

 // Wait for an incoming request instead of prerendering.
    await connection();

    const { eventId } = await params;

    const session = await getSession();

    return (
        <EventDetailContent
            userId={session.data?.user.id ?? ""}
            eventId={eventId}
        />
    );
}

export default function EventDetailsPage({ params }: { params: Promise<{ eventId: string }> }) {
    return (
        <Suspense fallback={<div>Loading event details...</div>}>
            <EventDetails params={params} />
        </Suspense>
    );
}
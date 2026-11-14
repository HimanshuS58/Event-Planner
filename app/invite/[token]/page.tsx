import { Suspense } from "react";
import { InviteRsvpContent } from "@/components/invite-rsvp-content";


async function InvitePageContent({
    params,
    searchParams
}: {
    params: Promise<{ token: string }>;
    searchParams: Promise<{ submitted?: string }>;
}) {

    const [{ token }, query] = await Promise.all([
        params,
        searchParams
    ]);

    return (
        <InviteRsvpContent
            token={token}
            submitted={query.submitted === "1"}
        />
    );
}


export default function InvitePage({
    params,
    searchParams
}: {
    params: Promise<{ token: string }>;
    searchParams: Promise<{ submitted?: string }>;
}) {

    return (
        <Suspense fallback={<div>Loading invitation...</div>}>
            <InvitePageContent
                params={params}
                searchParams={searchParams}
            />
        </Suspense>
    );
}
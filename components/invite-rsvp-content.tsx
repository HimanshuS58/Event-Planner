import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Field } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { submitOrUpdateRsvpAction } from "@/lib/actions/events";

export async function InviteRsvpContent({
    token,
    submitted
}:
    {
        token: string,
        submitted: boolean
    }) {

    const row = await prisma.eventInvite.findFirst({
        where: { token },
        include: {
            event: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    location: true,
                    eventDate: true
                }
            }
        }
    })

    if (!row) {
        notFound();
    }

    const e = row.event;

    const event = {
        title: e.title,
        description: e.description,
        location: e.location,
        eventDate: e.eventDate ? e.eventDate.toISOString() : null,
    }

    const submitRsvpForToken = submitOrUpdateRsvpAction.bind(null, token)

    return (
        <div className="mx-auto w-full max-w-2xl">
            <Card>
                <CardHeader className="space-y-3">
                    <Badge variant="secondary" className="w-fit">
                        RSVP
                    </Badge>
                    <CardTitle>
                        {event.title}
                    </CardTitle>
                    <p className="text-sm text-(--muted-foreground)">
                        {event.eventDate
                            ? new Date(event.eventDate).toLocaleString()
                            : "No date selected"}
                        {event.location ? ` - ${event.location}` : ""}
                    </p>
                    {event.description ? (
                        <p className="text-sm text-(--muted-foreground)">
                            {event.description}
                        </p>
                    ) : null}
                </CardHeader>
                <CardContent>
                    {
                        submitted
                            ? <p className="mb-4 rounded-md border border-(--accent)/50 bg-(--accent)/15 p-3 text-sm text-[#e9dbff]">
                                Thanks. Your RSVP has been recorded (or updated).
                            </p>
                            : null
                    }
                    <form
                        action={submitRsvpForToken}
                        className="space-y-3"
                    >
                        <Field>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" required placeholder="Your Name" />
                        </Field>
                        <Field>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="you@example.com" />
                        </Field>
                        <Field>
                            <Label htmlFor="status">Attendance</Label>
                            <select
                                id="status"
                                name="status"
                                required
                                defaultValue="going"
                                className="flex h-10 w-full rounded-md border border-(--border) bg-(--surface) px-3 py-2 text-sm text-foreground"
                            >
                                <option value="going">Going</option>
                                <option value="maybe">Maybe</option>
                                <option value="not_going">Not going</option>
                            </select>
                        </Field>
                        <Button type="submit">Submit RSVP</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}



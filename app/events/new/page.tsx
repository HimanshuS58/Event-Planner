import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { createEventAction } from "@/lib/actions/events";


export default async function NewEventPage() {
    return (
        <div className="mx-auto w-full max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Create event
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form action={createEventAction} className="space-y-3">
                        <Field>
                            <Label>
                                Title
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                required
                                placeholder="Team dinner"
                            />
                        </Field>
                            <Field>
                            <Label>
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"                               
                                placeholder="Optional details about the event"
                            />
                        </Field>
                         <Field>
                            <Label>
                                Location
                            </Label>
                            <Input
                                id="location"
                                name="location"                               
                                placeholder="Optional location"
                            />
                        </Field>
                        <Field>
                            <Label>Date and Time</Label>
                            <Input
                             id="eventDate"
                             name="eventDate"
                             type="datetime-local" 
                            />
                            <FieldDescription>Optional, you can set this later.</FieldDescription>
                        </Field>
                        <div className="flex items-center gap-3">
                            <Button type="submit">Create event</Button>
                            <Button type="button" variant="outline" asChild>
                                <Link href={"/dashboard"}>cancel</Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
                
            </Card>
        </div>
    )
}
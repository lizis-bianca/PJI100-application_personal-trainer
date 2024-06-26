import { NextResponse } from "next/server";
import * as z from "zod";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
    const slug = params.slug;
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    if (slug === null) return new NextResponse("Missing uuid parameter.", { status: 400 });

    try {
        const { data, error } = await supabase
            .from("workouts")
            .delete()
            .eq("id", slug)

        if (error) {
            return NextResponse.json({ success: false, error });
        }

        return NextResponse.json({ success: true });
    } catch (error) { 
        return NextResponse.json(
            {
                success: false,
                error: "unknown",
            },
            { status: 500 }
        );
    }
}
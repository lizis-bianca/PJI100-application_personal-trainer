import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const exerciseId = params.id
    
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    try {
        if (exerciseId == null || exerciseId == "") {
            return NextResponse.json(
                {
                    success: "false",
                    error: "Getting info about a specific exercise needs an exercise id",
                },
                {
                    status: 403,
                }
            );
        }

        let query = supabase
            .from("exercises")
            .delete()
            .eq("id", exerciseId);

        let { data, error } = await query; //query stuff here

        if (!error) {
            return NextResponse.json(
                { success: "true", data },
                {
                    status: 200,
                }
            );
        } else {
            return NextResponse.json(
                { success: "false", error },
                {
                    status: 403,
                }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { success: "false", error },
            {
                status: 403,
            }
        );
    }
}
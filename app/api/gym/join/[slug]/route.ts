import { NextResponse } from "next/server";
import * as z from "zod";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const paramsParser = z.object({
    slug: z
        .string()
        .min(2)
        .max(36)
        .refine((x) => /^[a-zA-Z0-9]{7}$/.test(x)),
});

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    const slug = params.slug;
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    if (slug === null) return new NextResponse("Missing gym referral code.", { status: 400 });

    try {
        paramsParser.parse({ slug });

        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const userProfile = await supabase
            .from("users")
            .select("profile")
            .eq("id", session?.user?.id);

        //1. validate if the user is a gym owner (cant affiliate himself)
        if (userProfile.data![0].profile === "gymOwner") {
            return NextResponse.json("Unauthorized", { status: 401 });
        }
        //2. validate if the user is not affiliated to any gym
        const afilliateStatus = await supabase
            .from("affiliates")
            .select("*")
            .eq("user_id", session?.user?.id);
        if (afilliateStatus.data?.length !== 0) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }
        //3. if both pass, affiliate the user to the gym.
        const gymId = await supabase.from("gym").select("id").eq("referral_code", slug);
        if (gymId.data?.length == 0) {
            return NextResponse.json(
                { success: false, error: "Gym doesnt exist" },
                { status: 404 }
            );
        }

        const createdAffiliation = await supabase.from("affiliates").insert({
            user_id: session.user.id,
            belongs_to: gymId.data![0].id,
            verified: true,
        });

        if (createdAffiliation.error) {
            return NextResponse.json(
                { success: false, error: createdAffiliation.error },
                { status: 400 }
            );
        }
        const response = NextResponse.redirect(new URL("/dashboard/gym", req.url));
        response.headers.set("Set-Cookie", `JoinGymSuccess=true; Max-Age=${60 * 6 * 24}; Path=/`);
        return response;
    } catch (error) {
        // Handle validation error
        return NextResponse.json("Invalid referral code.", { status: 400 });
    }
}

export async function POST(req: Request, { params }: { params: { slug: string } }) {
    const slug = params.slug;
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    if (slug === null) return new NextResponse("Missing gym referral code.", { status: 400 });

    try {
        paramsParser.parse({ slug });

        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const userProfile = await supabase
            .from("users")
            .select("profile")
            .eq("id", session?.user?.id);

        //1. validate if the user is a gym owner (cant affiliate himself)
        if (userProfile.data![0].profile === "gymOwner") {
            return NextResponse.json("Unauthorized", { status: 401 });
        }
        //2. validate if the user is not affiliated to any gym
        const afilliateStatus = await supabase
            .from("affiliates")
            .select("*")
            .eq("user_id", session?.user?.id);
        if (afilliateStatus.data?.length !== 0) {
            return NextResponse.json("Unauthorized", { status: 401 });
        }
        //3. if both pass, affiliate the user to the gym.
        const gymId = await supabase.from("gym").select("id").eq("referral_code", slug);
        if (gymId.data?.length == 0) {
            return NextResponse.json(
                { success: false, error: "Gym doesnt exist" },
                { status: 404 }
            );
        }

        const createdAffiliation = await supabase.from("affiliates").insert({
            user_id: session.user.id,
            belongs_to: gymId.data![0].id,
            verified: true,
        });

        if (createdAffiliation.error) {
            return NextResponse.json(
                { success: false, error: createdAffiliation.error },
                { status: 400 }
            );
        }
        const response = NextResponse.redirect(new URL("/dashboard/gym", req.url));
        return response;
    } catch (error) {
        // Handle validation error
        return NextResponse.json("Invalid referral code.", { status: 400 });
    }
}

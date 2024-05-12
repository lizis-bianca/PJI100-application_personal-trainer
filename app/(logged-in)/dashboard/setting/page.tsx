import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SettingPage() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });

    const {
        data: { session },
        error,
    } = await supabase.auth.getSession();

    return redirect(`/dashboard/setting/${session?.user.id}`);
}

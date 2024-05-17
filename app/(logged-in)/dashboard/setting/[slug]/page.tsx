"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SkeletonProfile from "@/components/Dashboard/Profile/SkeletonProfile";
import { ModeToggle } from "@/components/ModeToggle";
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useSession } from "@/lib/supabase/useSession";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
type UserPageProps = {
  params: {
      slug: string;
  };
};

export default function SettingPage({ params }: UserPageProps) {
    const session = useSession();

    const { data, isLoading } = useQuery({
        queryKey: ["setting"], //key and params to define the query
        queryFn: () => {
            return axios.get(`/api/users/${params.slug}`).then((res) => res.data);
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    async function deleteUser({ params }: UserPageProps) {
      if (params.slug !== process.env.NEXT_PUBLIC_ADMIN_UUID){
        const user = await axios.delete(`/api/users/${params.slug}`);
        if (user.status === 200){
            toast({
                variant: "success",
                title: `Usuário ${params.slug} deletado com sucesso!`,
                description: `Você não irá mais visualizá-lo seu perfil e seus treinos.`,
            });
        }
      }
  }

    if (!isLoading) {
        return <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Configurações</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="font-semibold text-primary">
              Geral
            </Link>
            {/* <Link href="#" style={{pointerEvents: 'none'}}>Avançadas</Link> */}
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Aparência</CardTitle>
                <CardDescription>
                  Personalize a aparência do seu dispositivo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div data-align="center">
                  <ModeToggle side='right' />
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Minha Conta</CardTitle>
                <Separator className="mt-4" />
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger style={{ color: "red" }}>Excluir sua conta</AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso excluirá permanentemente sua conta e remova seus dados de nossos servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteUser({ params: {slug: data.id} })}>Continuar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>;
    }
  return <Skeleton></Skeleton>
}

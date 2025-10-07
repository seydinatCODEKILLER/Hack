import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "../validators/auth.schema";
import { useLogin } from "../hooks/useLogin";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import gsap from "gsap";

export const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const leftRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      leftRef.current,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 1.2 }
    )
      .fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.6"
      )
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.8"
      )
      .fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.5"
      );

    // 🌌 Effet parallax sur le fond (image)
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // sensibilité horizontale
      const y = (e.clientY / innerHeight - 0.5) * 20; // sensibilité verticale

      gsap.to(imgRef.current, {
        duration: 1.2,
        x: x,
        y: y,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-black overflow-hidden">
      {/* Zone gauche : illustration immersive du musée */}
      <div
        ref={leftRef}
        className="hidden md:flex w-1/2 relative overflow-hidden"
      >
        <img
          ref={imgRef}
          src="https://cdn.pixabay.com/photo/2017/04/05/01/10/natural-history-museum-2203648_640.jpg"
          alt="Musée virtuel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center text-white px-8">
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold mb-4 tracking-wide"
            >
              Musée Virtuel <span className="text-teal-400">Admin</span>
            </h1>
            <p ref={subtitleRef} className="text-gray-200 text-lg max-w-md mx-auto">
              Gérez les expositions, les œuvres et les panoramas du musée.
            </p>
          </div>
        </div>
      </div>

      {/* Zone droite : formulaire */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-background p-6 md:p-12">
        <div
          ref={formRef}
          className="w-full max-w-md space-y-6 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
        >
          <div className="text-center">
            <h2 className="text-md md:text-lg lg:text-2xl font-semibold text-foreground mb-2">
              Connexion à l’espace administrateur
            </h2>
            <p className="text-muted-foreground text-sm">
              Entrez vos identifiants pour accéder à la gestion du musée.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ex: admin@musee-virtuel.sn"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre mot de passe"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white cursor-pointer"
                disabled={isPending}
                size="lg"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Se connecter
              </Button>
            </form>
          </Form>

          <div className="text-center text-xs text-muted-foreground mt-6">
            <p>© {new Date().getFullYear()} Musée Virtuel — Interface Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";
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
import baroqueBorder from "@/public/baroqueborder.png";
import magehat from "@/public/magehat.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  leader_name: z.string(),
  leader_email: z.string().email(),
  house: z.enum(["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"]),
  members: z
    .array(
      z.object({
        name: z.string().min(2),
        email: z.string().email(),
      })
    )
    .max(4), // Max 4 additional members + 1 leader = 5 total
});

export default function CreateTeam() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leader_name: session?.user?.name || "",
      leader_email: session?.user?.email || "",
      members: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members",
  });

  const [isSorting, setIsSorting] = useState(false);
  const [hasSorted, setHasSorted] = useState(false);

  const getHouseEmoji = (house: string) => {
    switch (house) {
      case "Gryffindor": return "🦁";
      case "Hufflepuff": return "🦡";
      case "Ravenclaw": return "🦅";
      case "Slytherin": return "🐍";
      default: return "🎩";
    }
  };

  const sortingHat = () => {
    if (hasSorted) return;
    
    setIsSorting(true);
    const houses = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
    let duration = 2000;
    let startTime = Date.now();
    
    // Pre-select final house
    const finalHouse = houses[Math.floor(Math.random() * houses.length)] as z.infer<typeof formSchema>["house"];

    const animate = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        const randomIndex = Math.floor((Date.now() / 100) % houses.length);
        form.setValue("house", houses[randomIndex] as z.infer<typeof formSchema>["house"]);
        requestAnimationFrame(animate);
      } else {
        form.setValue("house", finalHouse);
        setIsSorting(false);
        setHasSorted(true);
      }
    };

    animate();
  };

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/register");
    }
    if (session?.user) {
      form.setValue("leader_name", session.user.name || "");
      form.setValue("leader_email", session.user.email || "");
    }
  }, [session, status]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // TODO: Implement team creation API call
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-gradient-to-b from-rosewood to-blackbean">
      <div className="max-w-2xl mx-auto bg-[#c7b256] p-8 rounded-xl border-2 border-yellow-600 shadow-[0_0_50px_rgba(255,215,0,0.3)] relative">
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute -top-4 -left-2 h-12 w-auto"
        />
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute h-12 w-auto -bottom-4 -left-2 -scale-y-100"
        />
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute h-12 w-auto -top-4 -right-2 -scale-x-100"
        />
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute h-12 w-auto -bottom-4 -right-2 -scale-y-100 -scale-x-100"
        />
        <h1 className="text-6xl text-harryp text-center mb-12 text-licorice drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
          Create Your Team
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="house"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House</FormLabel>
                  <div className="flex gap-4">
                    <div
                      className={`h-10 px-3 py-2 rounded-md text-2xl text-licorice text-harryp
                      ${
                        isSorting ? "animate-pulse" : ""
                      } flex items-center gap-2`}
                    >
                      {field.value ? (
                        <>
                          {getHouseEmoji(field.value)} {field.value}
                        </>
                      ) : (
                        "Let the sorting hat decide..."
                      )}
                    </div>
                    {!hasSorted && (
                      <Button
                        type="button"
                        variant="hackwarts"
                        onClick={sortingHat}
                        disabled={isSorting}
                      >
                        🎩 Sort me!
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-licorice">
                  Team Leader
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="leader_name"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <Image
                          src={magehat}
                          alt="Mage hat"
                          className="w-5 h-5 absolute -top-3 -left-3 -rotate-[20deg] z-10"
                        />
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="leader_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-licorice">Team Members</h3>
                  {fields.length < 4 && (
                    <Button
                      type="button"
                      variant="hackwarts"
                      size="sm"
                      onClick={() => append({ name: "", email: "" })}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Member
                    </Button>
                  )}
                </div>

                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-[1fr_1fr_auto] gap-4 items-end"
                  >
                    <FormField
                      control={form.control}
                      name={`members.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="relative">
                          <Image
                            src={magehat}
                            alt="Mage hat"
                            className="w-5 h-5 absolute -top-3 -left-3 -rotate-[20deg] z-10"
                          />
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`members.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              variant="hackwarts"
              className="w-full hover:scale-100"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ILoginFormData } from "@/types/login.types";
import { IResponse } from "@/types/response.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const [formData, setFormData] = useState<ILoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );

      const data: IResponse = await response.json();

      console.log(data);

      if (!response.ok || !data.success) {
        if (data.error) {
          const errorMes = data?.error[0]?.msg;
          toast.error(`${data.message}: ${errorMes}`);
          return;
        }
        toast.error(data.message || "Internal Server Error");
        return;
      }

      toast.success("Login Successfull. You will be redirected in few seconds");
      router.push("/");
    } catch (error) {
      toast.error("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="my-3">
      <div className="flex justify-center items-center min-h-[70vh]">
        <Card className="w-full max-w-135">
          <CardHeader>
            <CardTitle className="font-semibold">Welcome</CardTitle>
            <CardTitle>Sign in to</CardTitle>
            <CardDescription>Smart Leads Dashboard</CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter the email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter the password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </form>
          </CardContent>

          <CardFooter>
            <Button className="bg-brand w-full" onClick={() => submitForm()}>
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

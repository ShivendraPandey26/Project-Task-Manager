"use client";

import { userSchema } from "@/lib/schema";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { countries } from "@/utils/countryList";
import { industryTypeList, roleList } from "@/utils/rolesAndIndustryTypesList";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { createUser } from "@/app/actions/user";

interface OnboardingFormProps {
  name?: string;
  email?: string;
  image?: string;
}

export type userDataType = z.infer<typeof userSchema>;

function OnboardingForm({ name, email, image }: OnboardingFormProps) {
  const [pending, setPending] = useState(false);

  const form = useForm<userDataType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: name || "",
      email: email || "",
      image: image || "",
      about: "",
      country: "",
      industryType: "",
      role: "",
    },
  });

  const onSubmit = async (data: userDataType) => {
    try {
      setPending(true);
      await createUser(data);
      setPending(false);
      toast.success("Onboarding completed successfully!");
    } catch (error) {
      console.log("Error submitting form:", error);
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Task Manager</CardTitle>
          <CardDescription>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
            suscipit officiis perferendis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        {...field}
                        // disabled={pending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="Enter your email"
                        {...field}
                        // disabled={pending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="country">Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="country" className="w-full">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.name} value={country.name}>
                            <>
                              <img
                                src={country.image}
                                alt={`${country.name} flag`}
                                className="w-4 h-4 mr-2 inline"
                              />
                              {country.name}{" "}
                              <span className="text-xs text-muted-foreground">
                                ( {country.code} )
                              </span>
                            </>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="industryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="industryType">
                        Industry Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger id="industryType" className="w-full">
                            <SelectValue placeholder="Select your industry type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {industryTypeList.map((industry) => (
                            <SelectItem key={industry.id} value={industry.name}>
                              {industry.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="role">Role at Organisation</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger id="role" className="w-full">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roleList.map((role) => (
                            <SelectItem key={role.id} value={role.name}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
               
              </div>
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="about">Bio</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Tell us about yourself" className="resize-none" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <CardFooter>
                <Button type="submit" disabled={pending} className="w-full">
                  {pending ? "Submitting..." : "Submit"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default OnboardingForm;

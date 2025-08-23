"use client";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { TechnologyFormProps } from "../client";

import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TechnologiesFormValues, technologiesSchema } from "@/schemas";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TechnologyForm({ id, title }: TechnologyFormProps) {
  const router = useRouter();

  const form = useForm<TechnologiesFormValues>({
    resolver: zodResolver(technologiesSchema),
    defaultValues: {
      title,
    },
  });

  const { isSubmitting } = form.formState;

  const toastMessage = "Technology updated successfully!";
  const toastLoading = "Updating technology...";
  const action = "Update";

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const updateTechnology = useMutation(
    trpc.technologies.update.mutationOptions({
      onMutate: () => {
        toast.loading(toastLoading);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.technologies.getAll.queryOptions());
        toast.success(toastMessage);
        router.push("/admin/technologies");
      },
      onError: (error) => {
        toast.error(error.message || "Something went wrong.");
        console.error("Error updating technology:", error);
      },
      onSettled: () => {
        toast.dismiss();
      },
    })
  );

  const onSubmit = async (data: TechnologiesFormValues) => {
    await updateTechnology.mutateAsync({ id, ...data });
  };

  useEffect(() => {
    const errors = form.formState.errors;
    const errorCount = Object.keys(errors).length;

    if (errorCount > 0 && form.formState.isSubmitted) {
      if (errorCount === 1) {
        const firstError = Object.values(errors)[0];
        toast.error(firstError?.message || "Please check the form for errors.");
      } else {
        toast.error("Please check the form for errors.");
      }
    }
  }, [form.formState.errors, form.formState.isSubmitted]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="max-w-[400px]">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Technology</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Technology title"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

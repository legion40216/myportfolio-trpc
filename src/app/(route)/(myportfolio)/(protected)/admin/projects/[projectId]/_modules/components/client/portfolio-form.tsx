"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { PortfolioFormValues, portfolioSchema } from "@/schemas";
import { formattedDataProps, initialDataProps } from "../client";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import PortfolioImageUpload from "./portfolio-form/portfolio-image_upload";

type PortfolioFormProps = {
  technologieOptions: formattedDataProps["technologies"];
} & initialDataProps;

export default function PortfolioForm({
  technologieOptions,
  id,
  title,
  description,
  webLink,
  githubLink,
  imgSrc,
  isFeatured,
  isArchived,
  technologies: portfolioTechnologies = [{ technologyId: "" }],
}: PortfolioFormProps) {
  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title,
      description,
      imgSrc,
      webLink,
      githubLink,
      isFeatured,
      isArchived,
      technologies: portfolioTechnologies,
    },
  });

  const router = useRouter();
  const { isSubmitting } = form.formState;

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const toastLoading = "Updating portfolio... Please wait.";
  const toastMessage = "Portfolio updated successfully!";
  const action = "Update";

  const updatePortfolio = useMutation(
    trpc.portfolios.update.mutationOptions({
      onMutate: () => {
        toast.loading(toastLoading);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.portfolios.getAll.queryOptions());
        toast.success(toastMessage);
        router.push("/admin/portfolios");
      },
      onError: (error) => {
        toast.error(error.message || "Something went wrong.");
        console.error("Error updating portfolio:", error);
      },
      onSettled: () => {
        toast.dismiss();
      },
    })
  );

  const onSubmit = async (data: PortfolioFormValues) => {
    // filter out any rows where technologyId is still empty
    const cleaned = {
      ...data,
      technologies: data.technologies?.filter(
        (t) => t.technologyId && t.technologyId.trim() !== ""
      ),
    };

    await updatePortfolio.mutateAsync({ id, ...cleaned });
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "technologies",
  });

  const addTechnology = () => append({ technologyId: "" });

  useEffect(() => {
    const errors = form.formState.errors;
    if (Object.keys(errors).length > 0 && form.formState.isSubmitted) {
      toast.error("Please check the form for errors.");
    }
  }, [form.formState.errors, form.formState.isSubmitted]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Image upload */}
          <div className="w-full max-w-[200px]">
            <FormField
              control={form.control}
              name="imgSrc"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PortfolioImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={isSubmitting}
                      onChange={(url) => {
                        field.onChange(url);
                      }}
                      onRemove={() => {
                        field.onChange("");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 space-y-2">
            <div className="w-full max-w-[400px]">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., Landing Page Redesign"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full max-w-[400px]">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Project description"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-full max-w-[400px]">
            <FormField
              control={form.control}
              name="webLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://example.com"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full max-w-[400px]">
            <FormField
              control={form.control}
              name="githubLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>GitHub Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://github.com/example"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Technologies Used */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <FormLabel className="text-base">Technologies</FormLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTechnology}
                disabled={
                  isSubmitting || fields.length >= technologieOptions.length
                }
              >
                <Plus className="size-4 mr-2" />
                Add Technology
              </Button>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-end gap-3 p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`technologies.${index}.technologyId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technology</FormLabel>
                        <Select
                          disabled={isSubmitting}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select technology" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {technologieOptions.map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => remove(index)}
                  disabled={isSubmitting}
                >
                  <Trash2 className="size-4 mr-2" />
                  Remove
                </Button>
              </div>
            ))}
          </div>

          {/* Portfolio Status Checkboxes */}
          <div className="flex flex-col space-y-3">
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormLabel>Featured Portfolio</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormLabel>Archived</FormLabel>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
}

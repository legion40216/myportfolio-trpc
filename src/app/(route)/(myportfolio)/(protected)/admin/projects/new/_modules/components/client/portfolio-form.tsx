"use client";
import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { PortfolioFormValues, portfolioSchema } from "@/schemas";
import { PortfolioFormProps } from "../client";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

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
import PortfolioImageUpload from "./product-form/portfolio-image_upload";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function PortfolioForm({ technologies }: PortfolioFormProps) {
  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: "",
      description: "",
      webLink: "",
      githubLink: "",
      imgSrc: "",
      isFeatured: false,
      isArchived: false,
      technologies: [],
    },
  });

  const router = useRouter();
  const { isSubmitting } = form.formState;

  const toastLoading = "Creating portfolio... Please wait.";
  const toastMessage = "Portfolio created successfully!";
  const action = "Create";

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createPortfolio = useMutation(
    trpc.portfolios.create.mutationOptions({
      onMutate: () => {
        toast.loading(toastLoading);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.portfolios.getAll.queryOptions()
        );
        toast.success(toastMessage);
        router.push("/admin/portfolios");
      },
      onError: (error) => {
        toast.error(error.message || "Something went wrong.");
        console.error("Error creating portfolio:", error);
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

    await createPortfolio.mutateAsync({ ...cleaned });
  };

  // Use field array for dynamic technology selections
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "technologies",
  });

  const addTechnology = () => {
    append({ technologyId: "" });
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
          className="space-y-5"
        >
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

          {/* Basic Portfolio Info */}
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
              <FormLabel className="text-base">
                Technologies
              </FormLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTechnology}
                disabled={
                  isSubmitting || fields.length >= technologies.length
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
                            {technologies.map((item) => (
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

          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
}

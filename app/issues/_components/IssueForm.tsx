"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { issueSchema } from "@/app/validationSchemas";
import { ErrorMessage, Spinner } from "@/components/index";
import { Issue } from "@prisma/client";

type IssueFormdata = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue
}
const IssueForm = ({issue}: { issue?: Issue }) => {
  const router = useRouter();
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormdata>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if(issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("Unexpected Error Occured!!");
    }
  })

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5 font-bold">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={onSubmit}
        className="space-y-5"
      >
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextArea size="3" placeholder="Description" defaultValue={issue?.description} {...register("description")}/>
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>{issue ? 'Update Issue' : 'Submit new Issue'}{' '} {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default IssueForm;

import { issueSchema, patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { title } from "process";

export async function PATCH(request: NextRequest,
                    {params}: {params: {id: string}}
    ) {
        const body = await request.json();
        const validation = patchIssueSchema.safeParse(body);

        if(!validation.success) {
            return NextResponse.json({error: validation.error.errors}, {status: 400})
        }

        const {assignedToUserId, title, description} = body;

        if(assignedToUserId) {
            const assignee = await prisma.user.findUnique({
                where: {id: assignedToUserId}
            })

            if(!assignee) {
                return NextResponse.json({error: "Assginee Not Found"}, {status: 404})
            }
        }

        const issue = await prisma.issue.findUnique({
            where: {
                id: parseInt(params.id)
            }
        })

        if(!issue) {
            return NextResponse.json({error: "Invalid issue"}, {status: 404})
        }

        const updatedIssue = await prisma.issue.update({
            where: { id: issue.id },
            data: {
                title,
                description,
                assignedToUserId
            }
        })

        return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest,
    {params}: {params: {id: string}}
) {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!issue) return NextResponse.json({ error: "Invalid Issue"}, {status: 404});

    await prisma.issue.delete({
        where: {
            id: issue.id
        }
    });

    return NextResponse.json({});
}
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';

import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';
import AssigneeSelect from './components/AssigneeSelect';
import DeleteIssueButton from './components/DeleteIssueButton';
import IssueDetails from './components/IssueDetails';
import IssueEditButton from './components/IssueEditButton';

interface Props {
    params: { id: string }
}
const IssueDetailsPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions);

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    if(!issue) notFound();

    return (
        <Grid columns={{ initial: "1", md: "5" }} gap="5">
            <Box className='lg:col-span-4'>
            <IssueDetails issue={issue} />
            </Box>

            {session && (<Box>
                <Flex direction="column" gap="4">
                    <AssigneeSelect issue={issue}/>
                    <IssueEditButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>)}
        </Grid>
    )
    }

export default IssueDetailsPage

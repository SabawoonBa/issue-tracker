'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DeleteIssueButton = ( { issueId }: { issueId: number}) => {
const router = useRouter();
  return (
    <AlertDialog.Root>
        <AlertDialog.Trigger>
            <Button color='red'><Trash2Icon className='h-4 w-4 mr-1' />Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
            <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
            <AlertDialog.Description>Are you sure? this cannot be undone.</AlertDialog.Description>

            <Flex justify="end" gap="3" mt="3">
                <AlertDialog.Cancel>
                    <Button color='gray'>Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button onClick={ async() => {
                        await axios.delete('/api/issues/' + issueId);
                        router.push('/issues');
                        router.refresh();
                    }} color='red'>Confirm Delete</Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

export default DeleteIssueButton

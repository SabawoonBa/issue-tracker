'use client';

import { Spinner } from '@/components';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ( { issueId }: { issueId: number}) => {
const router = useRouter();
const [error, setError] = useState(false);
const [isDeleting, setIsDeleting] = useState(false);
  return (
    <>
    <AlertDialog.Root>
        <AlertDialog.Trigger>
            <Button disabled={isDeleting} color='red'>{!isDeleting && <Trash2Icon className='h-4 w-4 mr-1' />} Delete Issue { isDeleting && <Spinner /> }</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
            <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
            <AlertDialog.Description>Are you sure? this cannot be undone.</AlertDialog.Description>

            <Flex justify="end" gap="3" mt="3">
                <AlertDialog.Cancel>
                    <Button color='gray'>Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action>
                    <Button disabled={isDeleting} onClick={ async() => {
                        try {
                            setIsDeleting(true);
                            await axios.delete('/api/issues/' + issueId);
                            router.push('/issues');
                            router.refresh();
                        } catch (error) {
                            console.error('Error deleting issue:', error);
                            setIsDeleting(true)
                            setError(true);
                        }
                    }} color='red'>Confirm Delete</Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>

    <AlertDialog.Root open={error}>
        <AlertDialog.Content>
            <AlertDialog.Title>Error</AlertDialog.Title>
            <AlertDialog.Description>This isuue can not be deleted</AlertDialog.Description>

            <AlertDialog.Cancel>
                <Button onClick={() => setError(false)} color='gray' mt="2">Close</Button>
            </AlertDialog.Cancel>
        </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  )
}

export default DeleteIssueButton

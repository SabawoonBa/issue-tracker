"use client"

import { Skeleton } from '@/components/index'
import { Issue, User } from '@prisma/client'
import { Avatar, Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({issue}: {issue: Issue}) => {
    const {data: users, error, isLoading } = useUsers();

    if(isLoading) return <Skeleton />;

    if(error) return null;

    const assignIssue = async (userId: string) => {
        try {
            await axios.patch(`/api/issues/${issue.id}`, {assignedToUserId: userId || null});
            toast.success("Assigned Successfully.");
        } catch (error) {
            toast.error(`Changes could not be saved! Error: ${error}`, );
        }
    };

   return (
    <>
    <Select.Root defaultValue={issue.assignedToUserId || ""} onValueChange={assignIssue}>
        <Select.Trigger placeholder='Assign...' />
        <Select.Content>
            <Select.Group>
                <Select.Label>Suggestions</Select.Label>
                <Select.Item value="0">Unassigned</Select.Item>
                {users?.map(user => <Select.Item key={user.id} value={user.id}><Avatar size="1" src={user!.image!} mr="3" radius="full" fallback="?"/> {user.name}</Select.Item>)}
            </Select.Group>
        </Select.Content>
    </Select.Root>
    <Toaster />
    </>
  )
}

const useUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000, //60s 
    retry: 3
});

export default AssigneeSelect

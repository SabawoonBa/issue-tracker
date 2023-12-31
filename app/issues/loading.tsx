import {IssueStatusBadge, Skeleton} from '@/components/index'
import { Table } from '@radix-ui/themes'
import React from 'react';
import IssuesAction from './IssuesAction';

const IssuesLoadingPage = () => {
    const issues = [1,2,3,4,5];
  return (
    <>
    <IssuesAction />
    <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Create At</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton />
                <div className="block md:hidden">
                <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
              <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell"><Skeleton /></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}

export default IssuesLoadingPage

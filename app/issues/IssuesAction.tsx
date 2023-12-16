import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'; 
import React from 'react'
import IssuesStatusFilter from './IssuesStatusFilter';

const IssuesAction = () => {
  return (
    <Flex mb='5' justify='between'>
      <IssuesStatusFilter />
      <Button className="float-right">
        <Link href="/issues/new">Add Issue</Link>
      </Button>
      </Flex>
  )
}

export default IssuesAction

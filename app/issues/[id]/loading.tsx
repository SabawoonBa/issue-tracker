import { Box, Flex, Card } from '@radix-ui/themes'
import React from 'react';

import { Skeleton } from '@/components/index';

const LoadingIssueDetails = () => {
  return (
    <Box className='max-w-xl'>
            <Skeleton width='3rem' />
            <Flex gap="2" my='3'>
                <Skeleton width='5rem' />
                <Skeleton width='8rem' />
            </Flex>

            <Card className='prose' mt='4'>
                <Skeleton count={5} />
            </Card>
        </Box>
  )
}

export default LoadingIssueDetails

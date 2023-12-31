import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'



const IssueEditButton = ({ issueId }: {issueId: number}) => {
  return (
    <div>
      <Button className='float-left'>
        <Pencil2Icon/>
        <Link href={`/issues/${issueId}/edit`} >
            Edit Issue
        </Link>
      </Button>
    </div>
  )
}

export default IssueEditButton

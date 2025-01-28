import { PlusIcon } from '../icons/PlusIcon'
import { Button } from './Button'
import { ShareIcon } from '../icons/ShareIcon'

//@ts-ignore
export function ButtonPair({calling}) {
  return <div className=' flex gap-2'>
    <Button startIcon= {<ShareIcon size='lg' />} size='md' variant='secondary' text='Share Brain' onClick={()=>console.log("heelo")}></Button>
    <Button startIcon= {<PlusIcon size='lg' />} size='md' variant='primary' text='Add Content' onClick= {calling}></Button>
  </div>
}
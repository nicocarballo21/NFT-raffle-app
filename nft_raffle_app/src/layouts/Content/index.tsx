import { MediaRenderer, useAddress } from '@thirdweb-dev/react'
import { Skeleton } from '@nextui-org/react'
import useRaffleStatus from '../../hooks/useRaffleContract'
import RaffleStatus from '../../components/RaffleStatus'
import EntryAmount from '../../components/EntryAmount'
import {
  controllersContent,
  controllersHeader,
  raffleControllers,
} from './styles'

const AppContent = () => {
  const { entryCostInEther, totalEntries } = useRaffleStatus()
  const address = useAddress()

  return (
    <main>
      <div className='max-w-screen-2xl grid grid-cols-2 gap-6 px-6 w-full'>
        <MediaRenderer
          width='100%'
          height='100%'
          className='border shadow-xl rounded-2xl'
          src='ipfs://QmS1gz2fNL6DfnfebNsY3KkdYh3vT4jcEArkndao6eCk5Z/Untitled%20design%20(14).png'
        />
        <div className={raffleControllers}>
          <div className={controllersHeader}>
            <span className='text-4xl font-bold'>
              Buy a ticket to win the NFT Prize!
            </span>
            <span className='text-xl'>
              Buy entries for a chance to win the NFT! Winner be selected and
              transferred the NFT. The more entries the higher chance you have
              of winning!
            </span>
          </div>

          <div className={controllersContent}>
            <RaffleStatus />

            <Skeleton
              isLoaded={!entryCostInEther.isLoading}
              className='rounded-xl text-xl font-bold'
              as='span'
            >
              Entry cost is: {entryCostInEther.data} MATIC
            </Skeleton>

            {address ? (
              <EntryAmount />
            ) : (
              <p className='text-center text-lg'>
                Connect your wallet to buy entries!
              </p>
            )}

            <Skeleton
              isLoaded={!totalEntries.isLoading}
              className='rounded-xl text-xl font-bold'
              as='span'
            >
              Total entries: {totalEntries.data} MATIC
            </Skeleton>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AppContent

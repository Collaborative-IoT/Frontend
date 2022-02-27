import { useRouter } from 'next/router'

interface Nothing {}

export const SaveCredentials: React.FC<Nothing> = () => {
  const router = useRouter()  
  const {refresh, access} = router.query;
  typeof window !== 'undefined' ? localStorage.setItem("r-ciot", refresh as string): null
  typeof window !== 'undefined' ?   localStorage.setItem("a-ciot", access as string): null
  return(<div></div>)
}
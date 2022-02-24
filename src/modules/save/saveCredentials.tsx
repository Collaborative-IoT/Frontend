import { useRouter } from 'next/router'

interface Nothing {}

export const SaveCredentials: React.FC<Nothing> = () => {
  const router = useRouter()  
  const {refresh, access} = router.query;
  localStorage.setItem("r-ciot", refresh as string);
  localStorage.setItem("a-ciot", access as string);
  return(<div></div>)
}
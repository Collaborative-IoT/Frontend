import { useRouter } from 'next/router'

interface Nothing {}

export const SaveCredentials: React.FC<Nothing> = () => {
  const router = useRouter()  
  const {refresh, access} = router.query;
  let issue = false;
  typeof window !== 'undefined' ? localStorage.setItem("r-ciot", refresh as string): issue = true;
  typeof window !== 'undefined' ?   localStorage.setItem("a-ciot", access as string): issue = true;

  if (!issue){
    localStorage.setItem("ciot_auth_status", "good");
  }
  else{
    localStorage.setItem("ciot_auth_status", "bad");
  }

  return(<div></div>)
}
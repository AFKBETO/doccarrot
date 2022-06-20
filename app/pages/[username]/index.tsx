import { useRouter } from 'next/router'

interface Props {

}

function User ({} : Props) {
  const router = useRouter()
  const { username } = router.query

  return (
    <div>Hello, {username}</div>
  )
}

export default User

import { useRouter } from 'next/router'

interface Props {

}

function User ({} : Props) {
  const router = useRouter()
  const { userid } = router.query

  return (
    <div>Hello, user { userid }
      <br />TODO : récupérer l'objet "user" du state de l'app global, en paramètre
    </div>
  )
}

export default User

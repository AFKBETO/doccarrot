import { useRouter } from 'next/router'
import React from "react";
import { USER_CONTEXT } from "../../../config/userContext";

interface Props {
}

function User ({} : Props) {
  const router = useRouter()
  const userContext = React.useContext(USER_CONTEXT)

  return (
    <div>Hello, user { userContext.userName }
    </div>
  )
}

export default User

import React from 'react'
import {USER_CONTEXT} from "../../../../config/userContext";

interface Props {

}

function IndexPatient({}: Props) {
  const userContext = React.useContext(USER_CONTEXT)

  return (
      <div>Page patient / user "{ userContext.userName }"
      </div>
  )
}

export default IndexPatient

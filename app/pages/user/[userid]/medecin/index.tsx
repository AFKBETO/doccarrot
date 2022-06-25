import React from 'react'
import {USER_CONTEXT} from "../../../../config/userContext";

interface Props {
}

function IndexMedecin({}: Props) {
  const userContext = React.useContext(USER_CONTEXT)

  return (
      <div>Page medecin / user "{ userContext.userName }"
      </div>
  )
}

export default IndexMedecin

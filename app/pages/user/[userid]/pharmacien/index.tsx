import React from 'react'
import {USER_CONTEXT} from "../../../../config/userContext";

interface Props {
}

function IndexPharmacien({}: Props) {
  const userContext = React.useContext(USER_CONTEXT)

  return (
      <div>Page pharmacien / user "{ userContext.userName }"
      </div>
  )
}

export default IndexPharmacien

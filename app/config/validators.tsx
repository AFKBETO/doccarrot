import { ReactNode } from "react"

export function validateEmail (email: string) : boolean {
  if (!/^[\w-.+]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) return true
  return false
}
  
export function validatePassword (password: string): ReactNode[] {
  const errors: ReactNode[] = []
  let index = 0
  if (!/\d+/.test(password)) {
    errors.push(<div key={index}>Le mot de passe doit avoir au moins une chiffre (0-9).</div>)
    index++
  }
  if (!/[a-z]+/.test(password)) {
    errors.push(<div key={index}>Le mot de passe doit avoir au moins une caractère minuscule.</div>)
    index++
  }
  if (!/[A-Z]+/.test(password)) {
    errors.push(<div key={index}>Le mot de passe doit avoir au moins une caractère majuscule.</div>)
    index++
  }
  if (!/(\W)|(_)+/.test(password)) {
    errors.push(<div key={index}>Le mot de passe doit avoir au moins une caractère spéciale.</div>)
    index++
  }
  if (!/[\s\S]{8,32}/.test(password)) {
    errors.push(<div key={index}>Le mot de passe doit avoir 8-32 caractères.</div>)
    index++
  }
  if (!/^[^ ]+/.test(password)) {
    errors.push(<div key={index}>Le mot de passe ne doit pas commencer avec une espace.</div>)
    index++
  }
  return errors
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";
import { CLIENT_ROUTES } from "@/app/router";
import { authorization } from "@/entities/user/model/userThunk";

export function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  

  const handlerAuth = (event: React.FormEvent) => {
    event.preventDefault()

    dispatch(authorization({ email, password }))
    navigate(CLIENT_ROUTES.BOOKS)
  }

  
  return (
    <form onSubmit={ handlerAuth }>
        <input defaultValue={email} onChange={({ target }) => setEmail(target.value)} type="email" required placeholder="You email" />
        <input defaultValue={password} onChange={({ target }) => setPassword(target.value)} type="password" required placeholder="You password" />
        <button type="submit">Auth</button>
    </form>
);
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/hooks/rtkHooks";
import { CLIENT_ROUTES } from "@/app/router";
import { registration } from "@/entities/user/model/userThunk";

export function RegForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  

  const handlerReg = (event: React.FormEvent) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      return alert("password not ok")
    }

    dispatch(registration({ email, password }))
    navigate(CLIENT_ROUTES.BOOKS)
  }

  
  return (
    <form onSubmit={ handlerReg }>
        <input defaultValue={email} onChange={({ target }) => setEmail(target.value)} type="email" required placeholder="You email" />
        <input defaultValue={password} onChange={({ target }) => setPassword(target.value)} type="password" required placeholder="You password" />
        <input defaultValue={confirmPassword} onChange={({ target }) => setConfirmPassword(target.value)} type="password" required placeholder="Confirm password" />
        <button type="submit">Auth</button>
    </form>
);
}
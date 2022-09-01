import React from 'react'
import { Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
export default function index() {
    let navigate = useNavigate()
    navigate("/app/myMoney")
  return (
    <div>Charging...</div>
  )
}

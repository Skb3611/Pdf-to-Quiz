"use client"
import React, { useEffect, useState } from 'react'
import QuizComponent from '@/components/QuizComponent'
import { useRouter } from 'next/navigation'
const page = () => {
    const [data, setdata] = useState(null)
    let router = useRouter()
    useEffect(() => {
    let localdata=localStorage.getItem("data")
    if(localdata){
         localdata= JSON.parse(localdata)
        setdata(localdata)
    }else router.push("/")
    }, [])
    
  return (
    <div>
        <QuizComponent data={data}/>
    </div>
  )
}

export default page

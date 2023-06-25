'use client'

import AddPost from "./components/AddPost"
import NavBar from "./components/NavBar"

export default function Home() {
  return (
    <div className="flex mt-6">
      <NavBar />
      <AddPost />
    </div>
  )
}

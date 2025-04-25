// Transformando a pagina em use client
'use client'

import { useEffect, useState } from "react";

export default function PageTeste() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then(data => setPosts(data.posts))
    }, [])
  
    return (
        <div>
            <h1>Página Client</h1>

            <div>
                {posts.map((post: any) => (
                    <div key={post.id} className="bg-gray-200 p-4 rounded-md">
                        <h2 className="font-bold">{post.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}
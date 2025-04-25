// Criando uma página com uso de requisições http

interface PostProps{
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface ResponseProps {
    posts: PostProps[]
}

export default async function ProgramaPage(){


    // Requisiçao usando uma API
    const response = await fetch('https://dummyjson.com/posts')
    const data: ResponseProps = await response.json(); // Conversão em JSON

    console.log(data);

    return(
        <body>
             <div>
            <h1>Todos os Programas</h1>
        </div> 

        <div className="flex flex-col gap-4 mx-2">
            {data.posts.map(post => (
                <div key={post.id} className="bg-gray-200 p-4 rounded-md">
                    <h1 className="font-bold">{post.title}</h1>
                </div>
            ))}
        </div>

        </body>
      

    );
}
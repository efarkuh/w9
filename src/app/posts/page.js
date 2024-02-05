import { sql } from "@vercel/postgres";
import Link from 'next/link';
import * as Form from '@radix-ui/react-form';
import { ClerkProvider, UserButton, auth, currentUser } from '@clerk/nextjs'


export default async function PostListPage(){ 
  
  async function handleAddComment(formData){
    "use server";
    const comment = formData.get("comment");
    // console.log(comment)
    const user = await currentUser();   
    await sql`
    INSERT INTO posts (Content, Username) VALUES (${comment}, ${user.username})`;
    
  }

  const posts = await sql`
          SELECT * FROM posts;
        `;
        return (
            <div className="post">

              <form action={handleAddComment}>
               
                <textarea className="comment" id="comment" placeholder="New post here please..."/>
                <button>Submit</button>
              </form>



              <h1>Timeline</h1>
              <ul>
                <li><p> <span>username</span>Post</p></li>
                {posts.rows.map((post) => (
                 <li key={post.id}>
                    
                    
                    <p> <span>{post.username}</span>{post.content}</p>
                 </li>
                ))}
              </ul>
            </div>
          );
        }    
    

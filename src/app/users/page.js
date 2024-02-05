import { sql } from "@vercel/postgres";
import Link from 'next/link';
import { ClerkProvider, UserButton, auth, currentUser } from '@clerk/nextjs'


export default async function UserListPage(){ 
    const user = await currentUser(); 
    const users = await sql`
    
          SELECT * FROM userprofile WHERE username = ${user.username};
        `;
        return (
            <div>
              <h1>Profile</h1>
              <ul>
                {users.rows.map((username) => (
                 <li key={username.id}>
                    <Link href={`/users/${username.username}`}>
                    {username.username}
                    </Link>
                 </li>
                ))}
              </ul>
            </div>
          );
        }    
    

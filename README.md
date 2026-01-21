# Blog API

Blog API which I'm building as part of [The Odin Project](https://www.theodinproject.com/) Node.js curriculum.

## Technologies

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## Objective

Build a Rest API for a Blog to learn about API basics and security.

## Progress

- ✅ Authentication system
  - ✅ Login
  - ✅ Register
  - ⚠️ Logout (JWT can't do)
- ❌ Users
  - ✅ GET Users
  - ✅ GET User
  - ✅ POST User
  - ❌ UPDATE User
  - ✅ DELETE User
- ✅ Posts
  - ✅ GET Posts
  - ✅ GET Post
  - ✅ POST Post
  - ✅ UPDATE Post
  - ✅ DELETE Post
- ✅ Comments
  - ✅ GET Comments
  - ✅ GET Comment
  - ✅ POST Comment
  - ✅ UPDATE Comment
  - ✅ DELETE Comment
- ❌ Likes
  - ❌ GET Likes
  - ❌ POST Like
  - ❌ DELETE Like

## Routes

### Authentication

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Method</th>
      <th>Route</th>
      <th>Description</th>
      <th>Authorization</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>✅</td>
      <td>GET</td>
      <td>/auth/profile</td>
      <td>Returns logged in user</td>
      <td>USER and ADMIN</td>
    </tr>
    <tr>
      <td>✅</td>
      <td>POST</td>
      <td>/auth/login</td>
      <td>Login user</td>
      <td>any</td>
    </tr>
    <tr>
      <td>✅</td>
      <td>POST</td>
      <td>/auth/register</td>
      <td>Creates and login a new user</td>
      <td>any</td>
    </tr>
    <tr>
      <td>⚠️</td>
      <td>POST</td>
      <td>/auth/logout</td>
      <td>Can't be implemented</td>
      <td>any</td>
    </tr>
  </tbody>
</table>

### Users

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Method</th>
      <th>Route</th>
      <th>Description</th>
      <th>Authorization</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>✅</td>
      <td>GET</td>
      <td>/api/users</td>
      <td>List users</td>
      <td>ADMIN</td>
    </tr>
    <tr>
      <td>✅</td>
      <td>GET</td>
      <td>/api/users/:userId</td>
      <td>Get user</td>
      <td>ADMIN</td>
    </tr>
    <tr>
      <td>✅</td>
      <td>GET</td>
      <td>/api/users/:userId/comments</td>
      <td>List user comments</td>
      <td>ADMIN</td>
    </tr>
    <tr>
      <td>✅</td>
      <td>POST</td>
      <td>/api/users</td>
      <td>Create new user</td>
      <td>ADMIN</td>
    </tr>
    <tr>
      <td>❌</td>
      <td>PATCH</td>
      <td>/api/users/:userId</td>
      <td>Not implemented</td>
      <td>any</td>
    </tr>
    <tr>
      <td>✅</td>
      <td>DELETE</td>
      <td>/api/users/:userId</td>
      <td>Delete user</td>
      <td>ADMIN</td>
    </tr>
  </tbody>
</table>

### Posts

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Method</th>
      <th>Route</th>
      <th>Description</th>
      <th>Authorization</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>✅</td>
      <td>GET</td>
      <td>/api/posts</td>
      <td>List posts</td>
      <td>any</td>
    </tr>
    <tr>
      <td>✅</td>
      <td>GET</td>
      <td>/api/posts/:postId</td>
      <td>Get post</td>
      <td>any</td>
    </tr>
    <tr>
      <td>✅</td>
      <td>GET</td>
      <td>/api/posts/:postId/comments</td>
      <td>List post comments</td>
      <td>any</td>
    </tr>
    <tr>
      <td>✅</td>
      <td>POST</td>
      <td>/api/posts</td>
      <td>Create post</td>
      <td>ADMIN</td>
    </tr>
    <tr>
      <td>✅</td>
      <td>PATCH</td>
      <td>/api/posts/:postId</td>
      <td>Update post</td>
      <td>ADMIN</td>
    </tr>
    <tr>
      <td>✅</td>
      <td>DELETE</td>
      <td>/api/posts/:postId</td>
      <td>Delete post</td>
      <td>ADMIN</td>
    </tr>
  </tbody>
</table>

### Comments

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Method</th>
      <th>Route</th>
      <th>Description</th>
      <th>Authorization</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>✅</td>
      <td>GET</td>
      <td>/api/comments</td>
      <td>Get comment</td>
      <td>any</td>
    </tr>
    <tr>
      <td>✅</td>
      <td>POST</td>
      <td>/api/comments/:postId</td>
      <td>Create comment</td>
      <td>USER and ADMIN</td>
    </tr>
    <tr>
      <td>⚠️</td>
      <td>PATCH</td>
      <td>/api/comments/:commentId</td>
      <td>Update comment</td>
      <td>ADMIN (TODO: add USER) </td>
    </tr>
    <tr>
      <td>✅</td>
      <td>DELETE</td>
      <td>/api/comments/:commentId</td>
      <td>Delete comment</td>
      <td>USER and ADMIN</td>
    </tr>
  </tbody>
</table>

### Likes

> ⚠️ In progress

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Method</th>
      <th>Route</th>
      <th>Description</th>
      <th>Authorization</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>❌</td>
      <td>POST</td>
      <td>/api/likes/:postId</td>
      <td>Like a post</td>
      <td>USER and ADMIN</td>
    </tr>
    <tr>
      <td>❌</td>
      <td>DELETE</td>
      <td>/api/likes/:postId</td>
      <td>Unlike a post</td>
      <td>USER and ADMIN</td>
    </tr>
  </tbody>
</table>
